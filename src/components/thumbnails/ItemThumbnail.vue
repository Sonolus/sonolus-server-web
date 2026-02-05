<script lang="ts">
import type { Item } from '@/utils/item'
import type { ItemType } from '@sonolus/core'
import type { Component } from 'vue'
import LevelThumbnail from './LevelThumbnail.vue'
import ReplayThumbnail from './ReplayThumbnail.vue'
import SimpleItemThumbnail from './SimpleItemThumbnail.vue'

const thumbnails: Partial<Record<ItemType, Component>> = {
    level: LevelThumbnail,
    replay: ReplayThumbnail,
}
</script>

<script setup lang="ts">
defineProps<{
    type: ItemType
    item: Item
}>()
</script>

<template>
    <component :is="thumbnails[type] ?? SimpleItemThumbnail" :type :item />
</template>
