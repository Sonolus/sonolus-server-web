<script setup lang="ts">
import { useI18n } from '../../i18n'
import BackgroundDetailsView from '../../views/details/BackgroundDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="backgrounds"
        :i18n-message="i18n.clients.customServer.background.details"
    >
        <template #loaded="{ data }">
            <BackgroundDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
