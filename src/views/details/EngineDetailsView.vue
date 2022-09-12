<script setup lang="ts">
import type { EngineItem, ItemDetails } from 'sonolus-core'
import EngineCard from '../../components/cards/EngineCard.vue'
import EngineThumbnail from '../../components/thumbnails/EngineThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<EngineItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="engines"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.subtitle"
        :author="data.item.author"
    >
        <template #thumbnail>
            <EngineThumbnail :item="data.item" />
        </template>

        <template #recommended="{ item }">
            <EngineCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
