<script setup lang="ts">
import { useI18n } from '../i18n'
import HomeView from '../views/HomeView.vue'
import BaseRoute from './BaseRoute.vue'

const { i18n } = useI18n()

const appTitle = import.meta.env.VITE_TITLE
</script>

<template>
    <BaseRoute url="/sonolus/info">
        <template #loading>
            {{ i18n.clients.customServer.serverInfo.loading }}
        </template>

        <template #error>
            {{ i18n.clients.customServer.serverInfo.error(appTitle) }}
        </template>

        <template #loaded="{ data }">
            <HomeView :data="data" />
        </template>
    </BaseRoute>
</template>
