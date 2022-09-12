<script setup lang="ts">
import { useI18n } from '../../i18n'
import LevelDetailsView from '../../views/details/LevelDetailsView.vue'
import ItemDetailsRoute from './ItemDetailsRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <ItemDetailsRoute
        type="levels"
        :i18n-message="i18n.clients.customServer.level.details"
    >
        <template #loaded="{ data }">
            <LevelDetailsView :data="data" />
        </template>
    </ItemDetailsRoute>
</template>
