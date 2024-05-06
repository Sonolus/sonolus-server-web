<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import { icons } from '@/icons'
import IconMultiplayer from '@/icons/IconMultiplayer.vue'
import ItemInfoButton from '@/views/home/ItemInfoButton.vue'
import { viewOptions } from '@/views/viewOptions'
import type { ServerInfo } from '@sonolus/core'

defineOptions(
    viewOptions<typeof props>({
        url: () => '/info',
        loading: ({ i18n }) => i18n.clients.customServer.server.info.loading,
        error: ({ i18n }) =>
            i18n.clients.customServer.server.info.error(import.meta.env.VITE_TITLE),

        banner: ({ data }) => data?.banner?.url,
    }),
)

const props = defineProps<{
    data: ServerInfo
}>()

const infos = [
    ['rooms', 'multiplayer', IconMultiplayer],
    ['posts', 'post'],
    ['playlists', 'playlist'],
    ['levels', 'level'],
    ['replays', 'replay'],
    ['skins', 'skin'],
    ['backgrounds', 'background'],
    ['effects', 'effect'],
    ['particles', 'particle'],
    ['engines', 'engine'],
] as const
</script>

<template>
    <h1 class="text-center text-30 font-bold sm:text-36">
        {{ data.title }}
    </h1>
    <div class="flex justify-center">
        <OpenInSonolus />
    </div>
    <p v-if="data.description" class="mt-30 whitespace-break-spaces text-center sm:mt-36">
        {{ data.description }}
    </p>

    <div class="mt-30 flex flex-wrap justify-center gap-10 sm:mt-36 sm:gap-12">
        <template v-for="[type, title, icon] in infos" :key="type">
            <ItemInfoButton
                v-if="type !== 'rooms' || data.hasMultiplayer"
                v-bind="{ type, title }"
                :icon="icon ?? icons[type]"
            />
        </template>
    </div>
</template>
