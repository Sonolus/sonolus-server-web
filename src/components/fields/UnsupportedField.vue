<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import { i18n } from '@/i18n'
import type { ServerOption } from '@sonolus/core'

defineProps<{
    option: ServerOption
}>()
</script>

<template>
    <BaseField :option display-value="">
        <span class="whitespace-break-spaces">
            {{ i18n.optionNotSupported }}
        </span>
    </BaseField>
</template>
