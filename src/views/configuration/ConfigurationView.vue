<script setup lang="ts">
import { fields } from '@/components/fields'
import ViewSection from '@/components/ViewSection.vue'
import { configuration } from '@/configuration'
import { i18n, locales } from '@/i18n'
import { defaultLocale } from '@/i18n/locale'
import { viewOptions } from '@/views/viewOptions'
import type { ServerInfo, ServerOption } from '@sonolus/core'
import { computed } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: () => '/info',
        loading: ({ i18n }) => i18n.clients.customServer.server.info.loading,
        error: ({ i18n }) =>
            i18n.clients.customServer.server.info.error(import.meta.env.VITE_TITLE),
    }),
)

const props = defineProps<{
    data: ServerInfo
}>()

const options = computed<ServerOption[]>(() => [
    {
        query: 'localization',
        name: i18n.value.routes.settings.ui.contentLocalization.title,
        description: i18n.value.routes.settings.ui.contentLocalization.description,
        required: false,
        type: 'select',
        def: defaultLocale,
        values: locales.map((locale) => ({
            name: locale.name,
            title: locale.title,
        })),
    },
    ...props.data.configuration.options,
])
</script>

<template>
    <ViewSection :title="i18n.routes.server.home.configuration">
        <component
            :is="fields[option.type]"
            v-for="(option, key) in options"
            :key
            v-model="configuration"
            :option="option as never"
        />
    </ViewSection>
</template>
