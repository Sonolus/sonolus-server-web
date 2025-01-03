<script setup lang="ts">
import type { ItemThumbnailProps } from '@/components/thumbnails/ItemThumbnail'
import ItemThumbnail from '@/components/thumbnails/ItemThumbnail.vue'
import LevelThumbnailOverlay from '@/components/thumbnails/LevelThumbnailOverlay.vue'
import type { ReplayItem } from '@sonolus/core'

defineProps<
    ItemThumbnailProps<ReplayItem> & {
        fullSize?: boolean
    }
>()
</script>

<template>
    <ItemThumbnail :type :item />
    <LevelThumbnailOverlay :level="item.level" :full-size />
</template>
