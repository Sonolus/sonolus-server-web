<script setup lang="ts">
import { sonolusPost, sonolusUpload } from '@/client'
import AppButton from '@/components/AppButton.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n } from '@/i18n'
import { icons } from '@/icons'
import { paths } from '@/utils/item'
import type { ViewEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import type {
    ItemType,
    ServerItemCommunityComment,
    ServerSubmitItemCommunityCommentActionResponse,
    ServerUploadItemCommunityCommentActionResponse,
} from '@sonolus/core'
import { useRouter } from 'vue-router'

const props = defineProps<{
    type: ItemType
    name: string
    title: string
    comment: ServerItemCommunityComment
}>()

const emit = defineEmits<
    ViewEmit & {
        updateCommunity: []
        updateComments: []
        navigateCommentsToPage: [page: number]
    }
>()

const router = useRouter()

const onSubmit = async (result: FormResult) => {
    router.back()

    try {
        emit('overlay', {
            type: 'loading',
            getMessage: () => i18n.value.clients.customServer[props.type].community.submit.loading,
        })

        const {
            key,
            hashes,
            shouldUpdateCommunity,
            shouldUpdateComments,
            shouldNavigateCommentsToPage = -1,
        } = await sonolusPost<ServerSubmitItemCommunityCommentActionResponse>({
            url: `/${paths[props.type]}/${props.name}/community/comments/${props.comment.name}/submit`,
            body: {
                values: new URLSearchParams(result.query).toString(),
            },
        })

        if (hashes.length) {
            await sonolusUpload<ServerUploadItemCommunityCommentActionResponse>({
                url: `/${paths[props.type]}/${props.name}/community/comments/${props.comment.name}/upload`,
                key,
                hashes,
                files: result.files,
            })
        }

        if (shouldUpdateCommunity) {
            emit('updateCommunity')
        }

        if (shouldUpdateComments) {
            emit('updateComments')
        }

        if (shouldNavigateCommentsToPage >= 0) {
            emit('navigateCommentsToPage', shouldNavigateCommentsToPage)
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
    <div class="bg-button-disabled p-10 sm:p-12">
        <div
            class="flex h-15 justify-between gap-15 text-15 text-text-soften sm:h-18 sm:gap-18 sm:text-18"
        >
            <span class="text-left">{{ comment.author }}</span>
            <span class="text-right">{{ new Date(comment.time).toLocaleString() }}</span>
        </div>
        <div class="mt-5 whitespace-break-spaces sm:mt-6">{{ comment.content }}</div>

        <div
            v-if="comment.actions.length"
            class="mt-5 flex flex-wrap justify-end gap-10 sm:mt-6 sm:gap-12"
        >
            <AppButton
                v-for="(action, key) in comment.actions"
                :key
                :to="{
                    name: `${type}-action`,
                    params: { name },
                    data: { title, action, onSubmit },
                }"
                :icon="dynamicIcons[action.icon ?? ''] ?? icons[type]"
            />
        </div>
    </div>
</template>
