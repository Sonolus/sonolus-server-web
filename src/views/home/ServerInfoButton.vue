<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import { useI18n } from '@/i18n'
import { icons } from '@/icons'
import IconConfiguration from '@/icons/IconConfiguration.vue'
import IconLogin from '@/icons/IconLogin.vue'
import IconMultiplayer from '@/icons/IconMultiplayer.vue'
import type { ServerInfoButton } from '@sonolus/core'

defineProps<ServerInfoButton>()

const { i18n } = useI18n()

const paths = {
    multiplayer: 'room',
    post: 'post',
    playlist: 'playlist',
    level: 'level',
    replay: 'replay',
    skin: 'skin',
    background: 'background',
    effect: 'effect',
    particle: 'particle',
    engine: 'engine',
} as const
</script>

<template>
    <div
        v-if="type === 'authentication'"
        class="flex w-120 flex-col items-center gap-10 bg-button-disabled p-10 text-text-disabled sm:w-144 sm:gap-12 sm:p-12"
        inert
    >
        <IconLogin class="size-60 fill-current sm:size-72" />
        <span>{{ i18n.routes.server.home.login }}</span>
    </div>
    <div
        v-else-if="type === 'configuration'"
        class="flex w-120 flex-col items-center gap-10 bg-button-disabled p-10 text-text-disabled sm:w-144 sm:gap-12 sm:p-12"
        inert
    >
        <IconConfiguration class="size-60 fill-current sm:size-72" />
        <span>{{ i18n.routes.server.home.configuration }}</span>
    </div>
    <AppLink
        v-else
        class="flex w-120 flex-col items-center gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-144 sm:gap-12 sm:p-12"
        :to="{ name: `${paths[type]}-info` }"
    >
        <component
            :is="type === 'multiplayer' ? IconMultiplayer : icons[paths[type]]"
            class="size-60 fill-current sm:size-72"
        />
        <span>{{ i18n.routes.server.home[type] }}</span>
    </AppLink>
</template>
