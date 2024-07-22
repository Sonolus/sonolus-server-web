<script setup lang="ts">
import type { ItemPathType } from '@/utils/item'
import { pathToTypes } from '@/utils/type'
import SearchSection from '@/views/search/SearchSection.vue'
import { viewOptions } from '@/views/viewOptions'
import { Text, type ServerForm } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${type}/info`,
        loading: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[pathToTypes[type]].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[pathToTypes[type]].info.error(import.meta.env.VITE_TITLE),

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
        }"
    />

    <SearchSection v-for="(search, key) in data.searches" :key :type :query :search />
</template>
