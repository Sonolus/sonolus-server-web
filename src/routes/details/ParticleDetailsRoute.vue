<script setup lang="ts">
import { useI18n } from '../../i18n'
import ParticleDetailsView from '../../views/details/ParticleDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="particles"
        :i18n-message="i18n.clients.customServer.particle.details"
    >
        <template #loaded="{ data }">
            <ParticleDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
