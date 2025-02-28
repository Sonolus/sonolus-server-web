<script setup lang="ts">
import { i18n } from '@/i18n'
import IconCheck from '@/icons/IconCheck.vue'
import type { OverlayEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import FormView from '@/views/form/FormView.vue'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        title: ({ props: { name, data } }) => data?.title ?? name,
    }),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    type: ItemType
    name: string
    data: {
        title: string
        action: ServerForm
        onSubmit: (result: FormResult) => void
    }
}>()

defineEmits<OverlayEmit>()
</script>

<template>
    <FormView
        :query="{}"
        :forms="[data.action]"
        :icon="IconCheck"
        @overlay="$emit('overlay', $event)"
        @submit="data.onSubmit"
    >
        {{ i18n.common.submit }}
    </FormView>
</template>
