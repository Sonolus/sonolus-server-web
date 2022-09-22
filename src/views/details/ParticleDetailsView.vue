<script setup lang="ts">
import type { ItemDetails, ParticleItem } from 'sonolus-core'
import ParticleCard from '../../components/cards/ParticleCard.vue'
import ParticleThumbnail from '../../components/thumbnails/ParticleThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<ParticleItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="particles"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.subtitle"
        :author="data.item.author"
        :thumbnail="data.item.thumbnail"
    >
        <template #thumbnail>
            <ParticleThumbnail :item="data.item" />
        </template>

        <template #recommended="{ item }">
            <ParticleCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
