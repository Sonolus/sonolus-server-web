<script setup lang="ts">
import type { ItemDetails, LevelItem } from 'sonolus-core'
import LevelCard from '../../components/cards/LevelCard.vue'
import LevelThumbnail from '../../components/thumbnails/LevelThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<LevelItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="levels"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.artists"
        :author="data.item.author"
        :thumbnail="data.item.cover"
    >
        <template #thumbnail>
            <LevelThumbnail :item="data.item" full-size />
        </template>

        <template #recommended="{ item }">
            <LevelCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
