<script setup lang="ts">
import type { EffectItem, ItemList } from 'sonolus-core'
import EffectCard from '../../components/cards/EffectCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<EffectItem>
}>()
</script>

<template>
    <ItemListView type="effects" :data="data">
        <template #list="{ item }">
            <EffectCard :item="item" />
        </template>
    </ItemListView>
</template>
