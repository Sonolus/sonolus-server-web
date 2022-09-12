<script setup lang="ts">
import { useI18n } from '../../i18n'
import SkinDetailsView from '../../views/details/SkinDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="skins"
        :i18n-message="i18n.clients.customServer.skin.details"
    >
        <template #loaded="{ data }">
            <SkinDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
