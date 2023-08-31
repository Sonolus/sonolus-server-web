<script setup lang="ts">
import { useI18n } from '../../i18n'
import SkinListView from '../../views/lists/SkinListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="skins"
        :title="i18n.routes.server.lists.skin.title"
        :i18n-message="i18n.clients.customServer.skin.list"
    >
        <template #loaded="{ data }">
            <SkinListView :data="data" />
        </template>
    </ItemListRoute>
</template>
