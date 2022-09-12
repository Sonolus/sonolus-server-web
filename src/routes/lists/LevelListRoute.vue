<script setup lang="ts">
import { useI18n } from '../../i18n'
import LevelListView from '../../views/lists/LevelListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="levels"
        :title="i18n.routes.server.levelList.title"
        :i18n-message="i18n.clients.customServer.level.list"
    >
        <template #loaded="{ data }">
            <LevelListView :data="data" />
        </template>
    </ItemListRoute>
</template>
