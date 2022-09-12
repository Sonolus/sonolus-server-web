<script setup lang="ts">
import type { BackgroundItem } from 'sonolus-core'
import BackgroundThumbnail from '../thumbnails/BackgroundThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: BackgroundItem
}>()
</script>

<template>
    <ItemCard
        routeName="background-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.subtitle"
        :author="item.author"
        :thumbnail="item.thumbnail"
    >
        <BackgroundThumbnail :item="item" />
    </ItemCard>
</template>
