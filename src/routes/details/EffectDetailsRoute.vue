<script setup lang="ts">
import { useI18n } from '../../i18n'
import EffectDetailsView from '../../views/details/EffectDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="effects"
        :i18n-message="i18n.clients.customServer.effect.details"
    >
        <template #loaded="{ data }">
            <EffectDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
