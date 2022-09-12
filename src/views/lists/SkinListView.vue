<script setup lang="ts">
import type { ItemList, SkinItem } from 'sonolus-core'
import SkinCard from '../../components/cards/SkinCard.vue'
import ItemListView from './ItemListView.vue'

defineProps<{
    data: ItemList<SkinItem>
}>()
</script>

<template>
    <ItemListView type="skins" :data="data">
        <template #list="{ item }">
            <SkinCard :item="item" />
        </template>
    </ItemListView>
</template>
