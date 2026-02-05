<script lang="ts">
import type { Item } from '@/utils/item'
import type { ItemType } from '@sonolus/core'
import type { Component } from 'vue'
import SimpleItemCard from './SimpleItemCard.vue'
import UserCard from './UserCard.vue'

const cards: Partial<Record<ItemType, Component>> = {
    user: UserCard,
}
</script>

<script setup lang="ts">
defineProps<{
    type: ItemType
    item: Item
}>()
</script>

<template>
    <component :is="cards[type] ?? SimpleItemCard" :type :item />
</template>
