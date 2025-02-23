<script setup lang="ts">
import { auth } from '@/auth'
import AppLink from '@/components/AppLink.vue'
import { i18n } from '@/i18n'
import { icons } from '@/icons'
import IconConfiguration from '@/icons/IconConfiguration.vue'
import IconLogin from '@/icons/IconLogin.vue'
import IconLogout from '@/icons/IconLogout.vue'
import IconMultiplayer from '@/icons/IconMultiplayer.vue'
import type { ServerInfo, ServerInfoButton } from '@sonolus/core'

defineProps<{
    button: ServerInfoButton
    data: ServerInfo
}>()

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

const webAuth = !!import.meta.env.VITE_WEB_AUTH
</script>

<template>
    <template v-if="button.type === 'authentication'">
        <div
            v-if="!webAuth"
            class="flex w-120 flex-col items-center gap-10 bg-button-disabled p-10 text-text-disabled sm:w-144 sm:gap-12 sm:p-12"
            inert
        >
            <IconLogin class="size-60 fill-current sm:size-72" />
            <span>{{ i18n.routes.server.home.login }}</span>
        </div>
        <AppLink
            v-else
            class="flex w-120 flex-col items-center gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-144 sm:gap-12 sm:p-12"
            :to="{ name: 'authentication' }"
        >
            <component
                :is="auth ? IconLogout : IconLogin"
                class="size-60 fill-current sm:size-72"
            />
            <span>{{ auth ? i18n.routes.server.home.logout : i18n.routes.server.home.login }}</span>
        </AppLink>
    </template>
    <AppLink
        v-else-if="button.type === 'configuration'"
        class="flex w-120 flex-col items-center gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-144 sm:gap-12 sm:p-12"
        :to="{ name: 'configuration', data }"
    >
        <IconConfiguration class="size-60 fill-current sm:size-72" />
        <span>{{ i18n.routes.server.home.configuration }}</span>
    </AppLink>
    <AppLink
        v-else
        class="flex w-120 flex-col items-center gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-144 sm:gap-12 sm:p-12"
        :to="{ name: `${paths[button.type]}-info` }"
    >
        <component
            :is="button.type === 'multiplayer' ? IconMultiplayer : icons[paths[button.type]]"
            class="size-60 fill-current sm:size-72"
        />
        <span>{{ i18n.routes.server.home[button.type] }}</span>
    </AppLink>
</template>
