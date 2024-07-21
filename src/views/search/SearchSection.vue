<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import ViewSection from '@/components/ViewSection.vue'
import MultiField from '@/components/fields/MultiField.vue'
import SelectField from '@/components/fields/SelectField.vue'
import SliderField from '@/components/fields/SliderField.vue'
import TextAreaField from '@/components/fields/TextAreaField.vue'
import TextField from '@/components/fields/TextField.vue'
import ToggleField from '@/components/fields/ToggleField.vue'
import UnsupportedField from '@/components/fields/UnsupportedField.vue'
import { useI18n } from '@/i18n'
import IconSearch from '@/icons/IconSearch.vue'
import type { ItemPathType } from '@/utils/item'
import type { ServerForm } from '@sonolus/core'
import { ref } from 'vue'

const props = defineProps<{
    type: ItemPathType
    search: ServerForm
    query: Record<string, string>
}>()

const { i18n, i18nText } = useI18n()

const query = ref(
    props.query.type === props.search.type
        ? Object.fromEntries(new URLSearchParams(props.query))
        : { type: props.search.type },
)

const fields = {
    text: TextField,
    textArea: TextAreaField,
    slider: SliderField,
    toggle: ToggleField,
    select: SelectField,
    multi: MultiField,
    serverItem: UnsupportedField,
    serverItems: UnsupportedField,
    collectionItem: UnsupportedField,
    file: UnsupportedField,
} as const
</script>

<template>
    <AppForm>
        <ViewSection :title="i18nText(search.title)">
            <component
                :is="fields[option.type]"
                v-for="(option, key) in search.options"
                :key
                v-model="query"
                :option="option as never"
            />
            <div class="flex justify-end">
                <AppButton :to="{ name: `${type}-list`, query }" :icon="IconSearch" data-submit>
                    {{ i18n.common.search }}
                </AppButton>
            </div>
        </ViewSection>
    </AppForm>
</template>
