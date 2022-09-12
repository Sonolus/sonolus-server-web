<script setup lang="ts">
import type { EngineItem } from 'sonolus-core'
import EngineIcon from '../../assets/engine.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: EngineItem
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.thumbnail" :fallback="EngineIcon" />
</template>
