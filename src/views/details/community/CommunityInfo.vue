<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationControls from '@/components/pagination/PaginationControls.vue'
import PaginationMoreButton from '@/components/pagination/PaginationMoreButton.vue'
import { useI18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import CommunityComment from '@/views/details/community/CommunityComment.vue'
import type {
    ItemType,
    ServerItemCommunityCommentList,
    ServerItemCommunityInfo,
} from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
    info: ServerItemCommunityInfo
}>()

const { locale, i18n } = useI18n()

const show = ref(false)
const param = ref<string | number>(0)

const isLoading = ref(true)
const list = ref<ServerItemCommunityCommentList>()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
    if (!show.value) return

    try {
        isLoading.value = true
        list.value = undefined

        const searchParams = new URLSearchParams()
        if (typeof param.value === 'string') {
            searchParams.append('cursor', param.value)
        } else {
            searchParams.append('page', `${param.value}`)
        }
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${paths[props.type]}/${props.name}/community/comments/list?${searchParams}`,
        )
        list.value = (await response.json()) as never
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <Transition
        mode="out-in"
        enter-from-class="opacity-0"
        enter-active-class="transition-opacity"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity"
    >
        <div
            v-if="info.topComments.length && show && isLoading"
            class="flex flex-col items-center gap-10 sm:gap-12"
        >
            <LoadingSpinner />
            <span class="whitespace-break-spaces text-center">
                {{ i18n.clients.customServer[type].community.comment.list.loading }}
            </span>
        </div>

        <div
            v-else-if="info.topComments.length && show && list"
            class="flex flex-col gap-10 sm:gap-12"
        >
            <CommunityComment v-for="(comment, j) in list.comments" :key="j" :comment />
            <PaginationControls v-model="param" :count="list.pageCount" :cursor="list.cursor" />
        </div>

        <div v-else-if="info.topComments.length && show" class="flex justify-center">
            <IconXMark class="size-50 fill-text-disabled sm:size-60" />
        </div>

        <div v-else-if="info.topComments.length" class="flex flex-col gap-10 sm:gap-12">
            <CommunityComment v-for="(comment, j) in info.topComments" :key="j" :comment />
            <div class="flex justify-center">
                <PaginationMoreButton @click="show = true" />
            </div>
        </div>

        <div
            v-else
            class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
        >
            {{ i18n.routes.server.details.community.noComments }}
        </div>
    </Transition>
</template>
