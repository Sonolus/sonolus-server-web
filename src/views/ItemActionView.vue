<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { i18n } from '@/i18n'
import IconCheck from '@/icons/IconCheck.vue'
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
</script>

<template>
    <FormView v-slot="result" :query="{}" :forms="[data.action]">
        <AppButton :icon="IconCheck" data-submit @click="data.onSubmit(result)">
            {{ i18n.common.submit }}
        </AppButton>
    </FormView>
</template>
