<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import RichText from '@/components/RichText.vue'
import ServerInfoButton from '@/views/home/ServerInfoButton.vue'
import { viewOptions } from '@/views/viewOptions'
import type { ServerInfo } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        url: () => '/info',
        loading: ({ i18n }) => i18n.clients.customServer.server.info.loading,
        error: ({ i18n }) =>
            i18n.clients.customServer.server.info.error(import.meta.env.VITE_TITLE),

        banner: ({ data }) => data?.banner?.url ?? undefined,
    }),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    data: ServerInfo
}>()
</script>

<template>
    <h1 class="text-center text-30 font-bold sm:text-36">
        {{ data.title }}
    </h1>
    <div class="flex justify-center">
        <OpenInSonolus />
    </div>
    <RichText v-if="data.description" class="mt-30 text-center sm:mt-36" :text="data.description" />

    <div class="mt-30 flex flex-wrap justify-center gap-10 sm:mt-36 sm:gap-12">
        <template v-for="button in data.buttons" :key="button.type">
            <ServerInfoButton :button :data />
        </template>
    </div>
</template>
