<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationControls from '@/components/pagination/PaginationControls.vue'
import PaginationMoreButton from '@/components/pagination/PaginationMoreButton.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { useI18n } from '@/i18n'
import IconCommunity from '@/icons/IconCommunity.vue'
import IconXMark from '@/icons/IconXMark.vue'
import type { ItemPathType } from '@/utils/item'
import { names } from '@/utils/name'
import CommunityComment from '@/views/details/community/CommunityComment.vue'
import type { ItemCommunityCommentList, ItemCommunityInfo } from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemPathType
    name: string
    info: ItemCommunityInfo
}>()

const { locale, i18n, i18nText } = useI18n()

const show = ref(false)
const page = ref(0)

const isLoading = ref(true)
const list = ref<ItemCommunityCommentList>()

watchEffect(async () => {
    if (!show.value) return

    try {
        isLoading.value = true
        list.value = undefined

        const searchParams = new URLSearchParams()
        searchParams.append('page', `${page.value}`)
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${props.type}/${props.name}/community/comments/list?${searchParams}`,
        )
        list.value = await response.json()
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="flex flex-col gap-30 sm:gap-36">
        <div v-if="info.actions.length" class="flex flex-wrap justify-center gap-10 sm:gap-12">
            <div
                v-for="(action, i) in info.actions"
                :key="i"
                class="flex min-w-120 gap-5 bg-button-disabled p-5 text-text-disabled sm:min-w-144 sm:gap-6 sm:p-6"
                inert
            >
                <component
                    :is="dynamicIcons[action.icon ?? ''] ?? IconCommunity"
                    class="size-20 flex-shrink-0 fill-current sm:size-24"
                />
                <span class="flex-grow px-2.5 text-center sm:px-3">
                    {{ i18nText(action.title) }}
                </span>
            </div>
        </div>

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
                    {{ i18n.clients.customServer[names[type]].community.comment.list.loading }}
                </span>
            </div>

            <div
                v-else-if="info.topComments.length && show && list"
                class="flex flex-col gap-10 sm:gap-12"
            >
                <CommunityComment v-for="(comment, j) in list.comments" :key="j" :comment />
                <PaginationControls v-model="page" :count="list.pageCount" />
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
    </div>
</template>
