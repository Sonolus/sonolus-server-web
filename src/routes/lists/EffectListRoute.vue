<script setup lang="ts">
import { useI18n } from '../../i18n'
import EffectListView from '../../views/lists/EffectListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="effects"
        :title="i18n.routes.server.lists.effect.title"
        :i18n-message="i18n.clients.customServer.effect.list"
    >
        <template #loaded="{ data }">
            <EffectListView :data="data" />
        </template>
    </ItemListRoute>
</template>
