<script setup lang="ts">
import type { BackgroundItem, ItemList } from 'sonolus-core'
import BackgroundCard from '../../components/cards/BackgroundCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<BackgroundItem>
}>()
</script>

<template>
    <ItemListView type="backgrounds" :data="data">
        <template #list="{ item }">
            <BackgroundCard :item="item" />
        </template>
    </ItemListView>
</template>
