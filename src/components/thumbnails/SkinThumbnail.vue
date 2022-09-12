<script setup lang="ts">
import type { SkinItem } from 'sonolus-core'
import SkinIcon from '../../assets/skin.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: SkinItem
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.thumbnail" :fallback="SkinIcon" />
</template>
