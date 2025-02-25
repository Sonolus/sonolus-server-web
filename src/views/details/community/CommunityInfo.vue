<script setup lang="ts">
import { sonolusGet, sonolusPost } from '@/client'
import AppButton from '@/components/AppButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationControls from '@/components/pagination/PaginationControls.vue'
import PaginationMoreButton from '@/components/pagination/PaginationMoreButton.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import { icons } from '@/icons'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import type { OverlayEmit } from '@/views/BaseView'
import CommunityComment from '@/views/details/community/CommunityComment.vue'
import type { FormResult } from '@/views/form'
import type {
    ItemType,
    ServerItemCommunityCommentList,
    ServerItemCommunityInfo,
    ServerSubmitItemCommunityActionResponse,
} from '@sonolus/core'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    type: ItemType
    name: string
    title: string
    info: ServerItemCommunityInfo
}>()

const emit = defineEmits<
    OverlayEmit & {
        update: []
    }
>()

const router = useRouter()

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

        list.value = await sonolusGet({
            url: `/${paths[props.type]}/${props.name}/community/comments/list`,
            query:
                typeof param.value === 'string'
                    ? { cursor: param.value }
                    : { page: `${param.value}` },
        })
    } finally {
        isLoading.value = false
    }
})

const onSubmit = async (result: FormResult) => {
    router.back()

    try {
        emit('overlay', {
            type: 'loading',
            getMessage: () => i18n.value.clients.customServer[props.type].community.submit.loading,
        })

        const {
            shouldUpdateCommunity,
            shouldUpdateComments,
            shouldNavigateCommentsToPage = -1,
        } = await sonolusPost<ServerSubmitItemCommunityActionResponse>({
            url: `/${paths[props.type]}/${props.name}/community/submit`,
            body: {
                values: new URLSearchParams(result.query).toString(),
            },
        })

        if (shouldUpdateCommunity) {
            emit('update')
        }

        if (shouldUpdateComments) {
            show.value = false
            show.value = true
        }

        if (shouldNavigateCommentsToPage >= 0) {
            show.value = false
            param.value = shouldNavigateCommentsToPage
            show.value = true
        }

        emit('overlay')
    } catch {
        emit('overlay', {
            type: 'error',
            getMessage: () =>
                i18n.value.clients.customServer[props.type].community.submit.error(
                    import.meta.env.VITE_TITLE,
                ),
        })
    }
}
</script>

<template>
    <div class="flex flex-col gap-30 sm:gap-36">
        <div v-if="info.actions.length" class="flex flex-wrap justify-center gap-10 sm:gap-12">
            <AppButton
                v-for="(action, key) in info.actions"
                :key
                :to="{
                    name: `${type}-community-action`,
                    params: { name },
                    data: { title, action, onSubmit },
                }"
                :icon="dynamicIcons[action.icon ?? ''] ?? icons[type]"
            >
                {{ i18nText(action.title) }}
            </AppButton>
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
    </div>
</template>
