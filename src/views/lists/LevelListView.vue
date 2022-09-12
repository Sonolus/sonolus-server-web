<script setup lang="ts">
import type { ItemList, LevelItem } from 'sonolus-core'
import LevelCard from '../../components/cards/LevelCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<LevelItem>
}>()
</script>

<template>
    <ItemListView type="levels" :data="data">
        <template #list="{ item }">
            <LevelCard :item="item" />
        </template>
    </ItemListView>
</template>
