<script setup lang="ts">
import AppForm from '@/components/AppForm.vue'
import { fields } from '@/components/fields'
import ViewSection from '@/components/ViewSection.vue'
import { i18nText } from '@/i18n'
import type { ServerForm } from '@sonolus/core'
import { ref } from 'vue'

const props = defineProps<{
    form: ServerForm
    query: Record<string, string>
}>()

const query = ref(
    props.query.type === props.form.type
        ? Object.fromEntries(new URLSearchParams(props.query))
        : { type: props.form.type },
)
</script>

<template>
    <AppForm>
        <ViewSection :title="i18nText(form.title)">
            <p v-if="form.description" class="whitespace-break-spaces">{{ form.description }}</p>

            <component
                :is="fields[option.type]"
                v-for="(option, key) in form.options"
                :key
                v-model="query"
                :option="option as never"
            />

            <div class="flex justify-end">
                <slot :query />
            </div>
        </ViewSection>
    </AppForm>
</template>
