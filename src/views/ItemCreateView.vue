<script setup lang="ts">
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
        <button
            class="flex min-w-120 items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:gap-6 sm:p-6"
            @click="data.onCreate(result)"
        >
            <IconPlus class="size-20 flex-shrink-0 fill-current sm:size-24" />
            <span class="flex-grow px-2.5 text-center sm:px-3">
                {{ i18n.common.create }}
            </span>
        </button>
    </FormView>
</template>
