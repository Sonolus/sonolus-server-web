<script setup lang="ts">
import type { OverlayEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import FormSection from '@/views/form/FormSection.vue'
import { type ServerForm } from '@sonolus/core'
import type { Component } from 'vue'

defineProps<{
    query: Record<string, string>
    forms: ServerForm[]
    icon: Component
}>()

defineEmits<
    OverlayEmit & {
        submit: [result: FormResult]
    }
>()
</script>

<template>
    <FormSection
        v-for="(form, key) in forms"
        :key
        :query
        :form
        :icon
        @overlay="$emit('overlay', $event)"
        @submit="$emit('submit', $event)"
    >
        <slot />
    </FormSection>
</template>
