<script setup lang="ts">
import { sonolusPost } from '@/client'
import AppButton from '@/components/AppButton.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import { icons } from '@/icons'
import { paths } from '@/utils/item'
import { viewReload, type OverlayEmit } from '@/views/BaseView'
import { type ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import type { FormResult } from '@/views/form'
import type { ServerSubmitItemActionResponse } from '@sonolus/core'
import { useRouter } from 'vue-router'

const props = defineProps<ItemDetailsViewProps>()

const emit = defineEmits<OverlayEmit>()

const router = useRouter()

const onSubmit = async (result: FormResult) => {
    router.back()

    try {
        emit('overlay', {
            type: 'loading',
            getMessage: () => i18n.value.clients.customServer[props.type].submit.loading,
        })

        const { shouldUpdateItem, shouldRemoveItem, shouldNavigateToItem } =
            await sonolusPost<ServerSubmitItemActionResponse>({
                url: `/${paths[props.type]}/${props.name}/submit`,
                body: {
                    values: new URLSearchParams(result.query).toString(),
                },
            })

        if (shouldRemoveItem) {
            router.back()
        } else if (shouldUpdateItem) {
            viewReload.value++
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
            :to="{
                name: `${type}-action`,
                params: { name },
                data: { title: data.item.title, action, onSubmit },
            }"
            :icon="dynamicIcons[action.icon ?? ''] ?? icons[type]"
        >
            {{ i18nText(action.title) }}
        </AppButton>
    </div>
</template>
