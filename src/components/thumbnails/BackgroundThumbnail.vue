<script setup lang="ts">
import type { BackgroundItem } from 'sonolus-core'
import BackgroundIcon from '../../assets/background.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: BackgroundItem
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.thumbnail" :fallback="BackgroundIcon" />
</template>
