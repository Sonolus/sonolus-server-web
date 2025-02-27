<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { i18n } from '@/i18n'
import IconPlus from '@/icons/IconPlus.vue'
import type { FormResult } from '@/views/form'
import FormView from '@/views/form/FormView.vue'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions({
        title: ({ i18n }) => i18n.common.create,
        error: ({ i18n }) => i18n.notFound,
    }),
)

defineProps<{
    type: ItemType
    data: {
        creates: ServerForm[]
        onCreate: (result: FormResult) => void
    }
}>()
</script>

<template>
    <FormView v-slot="result" :query="{}" :forms="data.creates">
        <AppButton :icon="IconPlus" data-submit @click="data.onCreate(result)">
            {{ i18n.common.create }}
        </AppButton>
    </FormView>
</template>
