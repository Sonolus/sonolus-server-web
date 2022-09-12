<script setup lang="ts">
import type { EngineItem, ItemList } from 'sonolus-core'
import EngineCard from '../../components/cards/EngineCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<EngineItem>
}>()
</script>

<template>
    <ItemListView type="engines" :data="data">
        <template #list="{ item }">
            <EngineCard :item="item" />
        </template>
    </ItemListView>
</template>
