<script setup lang="ts">
import { sonolusPost, sonolusUpload } from '@/client'
import AppButton from '@/components/AppButton.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import { icons } from '@/icons'
import { paths } from '@/utils/item'
import { type ViewEmit } from '@/views/BaseView'
import { type ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import type { FormResult } from '@/views/form'
import type {
    ServerForm,
    ServerSubmitItemActionResponse,
    ServerUploadItemActionResponse,
} from '@sonolus/core'
import { useRouter } from 'vue-router'

const props = defineProps<ItemDetailsViewProps>()

const emit = defineEmits<ViewEmit>()

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
            getMessage: () => i18n.value.clients.customServer[props.type].submit.loading,
        })

        const { key, hashes, shouldUpdateItem, shouldRemoveItem, shouldNavigateToItem } =
            await sonolusPost<ServerSubmitItemActionResponse>({
                url: `/${paths[props.type]}/${props.name}/submit`,
                body: {
                    values: new URLSearchParams(result.query).toString(),
                },
            })

        if (hashes.length) {
            await sonolusUpload<ServerUploadItemActionResponse>({
                url: `/${paths[props.type]}/${props.name}/upload`,
                key,
                hashes,
                files: result.files,
            })
        }

        if (shouldRemoveItem) {
            router.back()
        } else if (shouldUpdateItem) {
            emit('reload')
        }

        if (shouldNavigateToItem) {
            void router.push({
                name: `${props.type}-details`,
                params: { name: shouldNavigateToItem },
            })
        }

        emit('overlay')
    } catch {
        emit('overlay', {
            type: 'error',
            getMessage: () =>
                i18n.value.clients.customServer[props.type].submit.error(
                    import.meta.env.VITE_TITLE,
                ),
        })
    }
}
</script>

<template>
    <div v-if="data.actions.length" class="flex flex-wrap justify-center gap-10 sm:gap-12">
        <AppButton
            v-for="(action, key) in data.actions"
            :key
            :icon="dynamicIcons[action.icon ?? ''] ?? icons[type]"
            v-bind="
                action.options.length || action.description || action.help
                    ? {
                          to: {
                              name: `${type}-action`,
                              params: { name },
                              data: { title: data.item.title, action, onSubmit },
                          },
                      }
                    : {
                          onClick: () => onQuickSubmit(action),
                      }
            "
        >
            {{ i18nText(action.title) }}
        </AppButton>
    </div>
</template>
