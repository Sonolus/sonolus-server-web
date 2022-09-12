<script setup lang="ts">
import type { EffectItem } from 'sonolus-core'
import EffectThumbnail from '../thumbnails/EffectThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: EffectItem
}>()
</script>

<template>
    <ItemCard
        routeName="effect-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.subtitle"
        :author="item.author"
        :thumbnail="item.thumbnail"
    >
        <EffectThumbnail :item="item" />
    </ItemCard>
</template>
