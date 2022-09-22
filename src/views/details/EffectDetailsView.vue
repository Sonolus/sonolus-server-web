<script setup lang="ts">
import type { EffectItem, ItemDetails } from 'sonolus-core'
import EffectCard from '../../components/cards/EffectCard.vue'
import EffectThumbnail from '../../components/thumbnails/EffectThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<EffectItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="effects"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.subtitle"
        :author="data.item.author"
        :thumbnail="data.item.thumbnail"
    >
        <template #thumbnail>
            <EffectThumbnail :item="data.item" />
        </template>

        <template #recommended="{ item }">
            <EffectCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
