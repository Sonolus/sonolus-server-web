<script setup lang="ts">
import { useI18n } from '../../i18n'
import EngineListView from '../../views/lists/EngineListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="engines"
        :title="i18n.routes.server.lists.engine.title"
        :i18n-message="i18n.clients.customServer.engine.list"
    >
        <template #loaded="{ data }">
            <EngineListView :data="data" />
        </template>
    </ItemListRoute>
</template>
