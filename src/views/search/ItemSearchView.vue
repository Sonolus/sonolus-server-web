<script setup lang="ts">
import type { ItemPathType } from '@/utils/item'
import { names } from '@/utils/name'
import SearchSection from '@/views/search/SearchSection.vue'
import { viewOptions } from '@/views/viewOptions'
import { Text, type ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${type}/info`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[names[type]].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[names[type]].info.error(import.meta.env.VITE_TITLE),

        title: ({ i18n }) => i18n.routes.server.search.title,
    }),
)

const props = defineProps<{
    type: ItemPathType
    query: Record<string, string>
    data: {
        searches?: ServerForm[]
    }
}>()
</script>

<template>
    <SearchSection
        :type
        :query
        :search="{
            type: 'quick',
            title: Text.Search,
            options: [
                {
                    query: 'keywords',
                    type: 'text',
                    name: Text.Keywords,
                    placeholder: Text.KeywordsPlaceholder,
                },
            ],
        }"
    />

    <SearchSection v-for="(search, key) in data.searches" :key :type :query :search />
</template>
