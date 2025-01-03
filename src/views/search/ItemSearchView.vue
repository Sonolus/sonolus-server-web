<script setup lang="ts">
import { paths } from '@/utils/item'
import SearchSection from '@/views/search/SearchSection.vue'
import { viewOptions } from '@/views/viewOptions'
import { Text, type ItemType, type ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${paths[type]}/info`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[type].info.error(import.meta.env.VITE_TITLE),

        title: ({ i18n }) => i18n.routes.server.search.title,
    }),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    type: ItemType
    query: Record<string, string>
    data: {
        searches?: ServerForm[]
    }
}>()

const quickSearch: ServerForm = {
    type: 'quick',
    title: Text.Search,
    requireConfirmation: false,
    options: [
        {
            query: 'keywords',
            required: false,
            type: 'text',
            name: Text.Keywords,
            placeholder: Text.KeywordsPlaceholder,
            def: '',
            limit: 0,
            shortcuts: [],
        },
    ],
}
</script>

<template>
    <SearchSection :type :query :search="quickSearch" />

    <SearchSection v-for="(search, key) in data.searches" :key :type :query :search />
</template>
