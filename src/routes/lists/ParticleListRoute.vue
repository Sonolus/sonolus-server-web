<script setup lang="ts">
import { useI18n } from '../../i18n'
import ParticleListView from '../../views/lists/ParticleListView.vue'
import ItemListRoute from './ItemListRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemListRoute
        type="particles"
        :title="i18n.routes.server.particleList.title"
        :i18n-message="i18n.clients.customServer.particle.list"
    >
        <template #loaded="{ data }">
            <ParticleListView :data="data" />
        </template>
    </ItemListRoute>
</template>
