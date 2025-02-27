<script setup lang="ts">
import { i18n } from '@/i18n'
import IconPlus from '@/icons/IconPlus.vue'
import type { OverlayEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import FormView from '@/views/form/FormView.vue'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions({
        title: ({ i18n }) => i18n.common.create,
    }),
)

defineProps<{
    type: ItemType
    data: {
        creates: ServerForm[]
        onCreate: (result: FormResult) => void
    }
}>()

defineEmits<OverlayEmit>()
</script>

<template>
    <FormView
        :query="{}"
        :forms="data.creates"
        :icon="IconPlus"
        @overlay="$emit('overlay', $event)"
        @submit="data.onCreate"
    >
        {{ i18n.common.create }}
    </FormView>
</template>
