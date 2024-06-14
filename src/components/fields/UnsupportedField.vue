<script setup lang="ts">
import { useI18n } from '@/i18n'
import type { ServerOption } from '@sonolus/core'

defineProps<{
    option: ServerOption
}>()

const { i18nText } = useI18n()
</script>

<template>
    <div class="bg-button-disabled p-5 text-text-disabled sm:p-6" inert>
        {{ i18nText(option.name) }}
    </div>
</template>
