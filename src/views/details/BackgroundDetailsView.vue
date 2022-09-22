<script setup lang="ts">
import type { BackgroundItem, ItemDetails } from 'sonolus-core'
import BackgroundCard from '../../components/cards/BackgroundCard.vue'
import BackgroundThumbnail from '../../components/thumbnails/BackgroundThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<BackgroundItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="backgrounds"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.subtitle"
        :author="data.item.author"
        :thumbnail="data.item.thumbnail"
    >
        <template #thumbnail>
            <BackgroundThumbnail :item="data.item" />
        </template>

        <template #recommended="{ item }">
            <BackgroundCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
