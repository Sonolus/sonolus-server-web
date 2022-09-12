<script setup lang="ts">
import type { ItemDetails, SkinItem } from 'sonolus-core'
import SkinCard from '../../components/cards/SkinCard.vue'
import SkinThumbnail from '../../components/thumbnails/SkinThumbnail.vue'
import ItemDetailsView from './ItemDetailsView.vue'

defineProps<{
    data: ItemDetails<SkinItem>
}>()
</script>

<template>
    <ItemDetailsView
        type="skins"
        :data="data"
        :name="data.item.name"
        :title="data.item.title"
        :subtitle="data.item.subtitle"
        :author="data.item.author"
    >
        <template #thumbnail>
            <SkinThumbnail :item="data.item" />
        </template>

        <template #recommended="{ item }">
            <SkinCard :item="item" />
        </template>
    </ItemDetailsView>
</template>
