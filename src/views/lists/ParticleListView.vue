<script setup lang="ts">
import type { ItemList, ParticleItem } from 'sonolus-core'
import ParticleCard from '../../components/cards/ParticleCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<ParticleItem>
}>()
</script>

<template>
    <ItemListView type="particles" :data="data">
        <template #list="{ item }">
            <ParticleCard :item="item" />
        </template>
    </ItemListView>
</template>
