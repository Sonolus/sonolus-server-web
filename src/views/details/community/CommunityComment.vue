<script setup lang="ts">
import { sonolusPost, sonolusUpload } from '@/client'
import AppButton from '@/components/AppButton.vue'
import RichText from '@/components/RichText.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import { icons } from '@/icons'
import { paths } from '@/utils/item'
import type { ViewEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import type {
    ItemType,
    ServerForm,
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

const onQuickSubmit = (action: ServerForm) => {
    if (action.requireConfirmation) {
        emit('overlay', {
            type: 'confirm',
            getMessage: () => i18n.value.routes.server.forms.confirmation(i18nText(action.title)),
            onConfirm: () => {
                void submit({
                    query: {
                        type: action.type,
                    },
                    files: {},
                })
            },
        })
    } else {
        void submit({
            query: {
                type: action.type,
            },
            files: {},
        })
    }
}

const onSubmit = (result: FormResult) => {
    router.back()

    void submit(result)
}

const submit = async (result: FormResult) => {
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
        <div class="flex items-center text-15 text-text-soften sm:text-18">
            <AppButton
                v-if="comment.authorUser"
                :to="{ name: 'user-details', params: { name: comment.authorUser.name } }"
                auto-width
            >
                <span class="text-left">{{ comment.author }}</span>
            </AppButton>
            <span v-else class="text-left">{{ comment.author }}</span>
            <div
                v-for="(tag, key) in comment.authorUser?.tags"
                :key
                class="ml-5 flex gap-2.5 bg-button-disabled p-2.5 sm:ml-6 sm:gap-3 sm:p-3"
            >
                <component
                    :is="dynamicIcons[tag.icon ?? '']"
                    class="size-15 fill-current sm:size-18"
                />
                <span v-if="tag.title" class="px-2.5 text-15 sm:px-3 sm:text-18">{{
                    i18nText(tag.title)
                }}</span>
            </div>

            <div class="flex-grow" />

            <span class="text-right">{{ new Date(comment.time).toLocaleString() }}</span>
        </div>
        <RichText class="mt-5 sm:mt-6" :text="comment.content" />

        <div
            v-if="comment.actions.length"
            class="mt-5 flex flex-wrap justify-end gap-10 sm:mt-6 sm:gap-12"
        >
            <AppButton
                v-for="(action, key) in comment.actions"
                :key
                :icon="dynamicIcons[action.icon ?? ''] ?? icons[type]"
                v-bind="
                    action.options.length || action.description || action.help
                        ? {
                              to: {
                                  name: `${type}-action`,
                                  params: { name },
                                  data: { title, action, onSubmit },
                              },
                          }
                        : {
                              onClick: () => onQuickSubmit(action),
                          }
                "
            />
        </div>
    </div>
</template>
