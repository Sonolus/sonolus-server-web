<script setup lang="ts">
import type { ParticleItem } from 'sonolus-core'
import ParticleIcon from '../../assets/particle.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: ParticleItem
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.thumbnail" :fallback="ParticleIcon" />
</template>
