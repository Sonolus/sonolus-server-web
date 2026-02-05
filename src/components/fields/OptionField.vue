<script lang="ts">
import FileField from '@/components/fields/FileField.vue'
import MultiField from '@/components/fields/MultiField.vue'
import SelectField from '@/components/fields/SelectField.vue'
import SliderField from '@/components/fields/SliderField.vue'
import TextAreaField from '@/components/fields/TextAreaField.vue'
import TextField from '@/components/fields/TextField.vue'
import ToggleField from '@/components/fields/ToggleField.vue'
import UnsupportedField from '@/components/fields/UnsupportedField.vue'
import type { ServerOption } from '@sonolus/core'
import type { Component } from 'vue'
import type { OptionValues } from './value'

const fields: Partial<Record<ServerOption['type'], Component>> = {
    text: TextField,
    textArea: TextAreaField,
    slider: SliderField,
    toggle: ToggleField,
    select: SelectField,
    multi: MultiField,
    file: FileField,
}
</script>

<script setup lang="ts">
defineProps<{
    option: ServerOption
}>()

const values = defineModel<OptionValues>({ required: true })
</script>

<template>
    <component :is="fields[option.type] ?? UnsupportedField" v-model="values" :option />
</template>
