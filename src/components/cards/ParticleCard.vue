<script setup lang="ts">
import type { ParticleItem } from 'sonolus-core'
import ParticleThumbnail from '../thumbnails/ParticleThumbnail.vue'
import ItemCard from './ItemCard.vue'

defineProps<{
    item: ParticleItem
}>()
</script>

<template>
    <ItemCard
        routeName="particle-details"
        :name="item.name"
        :title="item.title"
        :subtitle="item.subtitle"
        :author="item.author"
        :thumbnail="item.thumbnail"
    >
        <ParticleThumbnail :item="item" />
    </ItemCard>
</template>
