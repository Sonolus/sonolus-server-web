<script setup lang="ts">
import FormSection from '@/views/form/FormSection.vue'
import { type ServerForm } from '@sonolus/core'

defineProps<{
    query: Record<string, string>
    forms: ServerForm[]
}>()
</script>

<template>
    <FormSection v-for="(form, key) in forms" :key v-slot="result" :query :form>
        <slot v-bind="result" />
    </FormSection>
</template>
