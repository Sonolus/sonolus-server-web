<script setup lang="ts">
import type { EngineItem } from 'sonolus-core'
import EngineThumbnail from '../thumbnails/EngineThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: EngineItem
}>()
</script>

<template>
    <ItemCard
        routeName="engine-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.subtitle"
        :author="item.author"
        :thumbnail="item.thumbnail"
    >
        <EngineThumbnail :item="item" />
    </ItemCard>
</template>
