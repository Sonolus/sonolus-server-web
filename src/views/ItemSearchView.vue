<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import { i18n } from '@/i18n'
import IconSearch from '@/icons/IconSearch.vue'
import { paths } from '@/utils/item'
import FormView from '@/views/form/FormView.vue'
import { viewOptions } from '@/views/viewOptions'
import { Text, type ItemType, type ServerForm } from '@sonolus/core'
import { computed } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${paths[type]}/info`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[type].info.error(import.meta.env.VITE_TITLE),

        title: ({ i18n }) => i18n.routes.server.search.title,
    }),
)

const props = defineProps<{
    type: ItemType
    query: Record<string, string>
    data: {
        searches?: ServerForm[]
    }
}>()

const forms = computed<ServerForm[]>(() => [
    {
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
    },
    ...(props.data.searches ?? []),
])
</script>

<template>
    <FormView v-slot="result" :query :forms>
        <AppButton
            :to="{ name: `${type}-list`, query: result.query }"
            :icon="IconSearch"
            data-submit
        >
            {{ i18n.common.search }}
        </AppButton>
    </FormView>
</template>
