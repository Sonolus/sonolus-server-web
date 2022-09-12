<script setup lang="ts">
import type { SkinItem } from 'sonolus-core'
import SkinThumbnail from '../thumbnails/SkinThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: SkinItem
}>()
</script>

<template>
    <ItemCard
        routeName="skin-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.subtitle"
        :author="item.author"
        :thumbnail="item.thumbnail"
    >
        <SkinThumbnail :item="item" />
    </ItemCard>
</template>
