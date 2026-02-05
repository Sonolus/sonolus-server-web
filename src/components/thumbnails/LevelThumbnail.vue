<script setup lang="ts">
import LevelThumbnailOverlay from '@/components/thumbnails/LevelThumbnailOverlay.vue'
import type { LevelItem } from '@sonolus/core'
import SimpleItemThumbnail from './SimpleItemThumbnail.vue'

defineProps<{
    type: 'level'
    item: LevelItem
    fullSize?: boolean
}>()
</script>

<template>
    <SimpleItemThumbnail :type :item />
    <LevelThumbnailOverlay :level="item" :full-size />
</template>
