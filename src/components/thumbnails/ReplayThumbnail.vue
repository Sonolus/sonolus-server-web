<script setup lang="ts">
import LevelThumbnailOverlay from '@/components/thumbnails/LevelThumbnailOverlay.vue'
import type { ReplayItem } from '@sonolus/core'
import SimpleItemThumbnail from './SimpleItemThumbnail.vue'

defineProps<{
    type: 'replay'
    item: ReplayItem
    fullSize?: boolean
}>()
</script>

<template>
    <SimpleItemThumbnail :type :item />
    <LevelThumbnailOverlay :level="item.level" :full-size />
</template>
