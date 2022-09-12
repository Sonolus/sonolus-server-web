<script setup lang="ts">
import { useI18n } from '../../i18n'
import BackgroundListView from '../../views/lists/BackgroundListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="backgrounds"
        :title="i18n.routes.server.backgroundList.title"
        :i18n-message="i18n.clients.customServer.background.list"
    >
        <template #loaded="{ data }">
            <BackgroundListView :data="data" />
        </template>
    </ItemListRoute>
</template>
