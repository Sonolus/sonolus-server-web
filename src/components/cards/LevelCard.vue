<script setup lang="ts">
import type { LevelItem } from 'sonolus-core'
import LevelThumbnail from '../thumbnails/LevelThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: LevelItem
}>()
</script>

<template>
    <ItemCard
        routeName="level-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.artists"
        :author="item.author"
        :thumbnail="item.cover"
    >
        <LevelThumbnail :item="item" />
    </ItemCard>
</template>
