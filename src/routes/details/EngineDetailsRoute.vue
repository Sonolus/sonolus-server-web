<script setup lang="ts">
import { useI18n } from '../../i18n'
import EngineDetailsView from '../../views/details/EngineDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="engines"
        :i18n-message="i18n.clients.customServer.engine.details"
    >
        <template #loaded="{ data }">
            <EngineDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
