<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import { fields } from '@/components/fields'
import ViewSection from '@/components/ViewSection.vue'
import { i18n, i18nText } from '@/i18n'
import IconSearch from '@/icons/IconSearch.vue'
import type { ItemType, ServerForm } from '@sonolus/core'
import { ref } from 'vue'

const props = defineProps<{
    type: ItemType
    search: ServerForm
    query: Record<string, string>
}>()

const query = ref(
    props.query.type === props.search.type
        ? Object.fromEntries(new URLSearchParams(props.query))
        : { type: props.search.type },
)
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
