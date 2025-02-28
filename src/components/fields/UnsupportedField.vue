<script setup lang="ts">
import { i18nText } from '@/i18n'
import type { ServerOption } from '@sonolus/core'

defineProps<{
    option: ServerOption
}>()
</script>

<template>
    <div class="bg-button-disabled p-5 text-text-disabled sm:p-6" inert>
        {{ i18nText(option.name) }}
    </div>
</template>
