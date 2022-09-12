<script setup lang="ts">
import type { EffectItem } from 'sonolus-core'
import EffectIcon from '../../assets/effect.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: EffectItem
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.thumbnail" :fallback="EffectIcon" />
</template>
