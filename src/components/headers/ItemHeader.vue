<script lang="ts">
type Normalized = {
    name: string
    author: string
    authorUser?: UserItem
    title: string
    subtitle: string
}

const normalizes: {
    [K in ItemType]: (item: ItemMap[K]) => Normalized
} = {
    room: (item) => ({ ...item, author: item.master, authorUser: item.masterUser }),
    post: (item) => ({ ...item, subtitle: new Date(item.time).toLocaleString() }),
    playlist: (item) => item,
    level: (item) => ({ ...item, subtitle: item.artists }),
    replay: (item) => item,
    skin: (item) => item,
    background: (item) => item,
    effect: (item) => item,
    particle: (item) => item,
    engine: (item) => item,
    user: (item) => ({ ...item, author: '', subtitle: '' }),
}
</script>

<script setup lang="ts">
import type { Item, ItemMap } from '@/utils/item'
import type { ItemType, UserItem } from '@sonolus/core'
import { computed } from 'vue'
import AppButton from '../AppButton.vue'

const props = defineProps<{
    type: ItemType
    item: Item
    clickable?: boolean
    alignLeft?: boolean
}>()

const normalized = computed(() => normalizes[props.type](props.item as never))
</script>

<template>
    <div
        class="flex flex-col items-center gap-2.5 sm:gap-3"
        :class="{ 'sm:items-start': alignLeft }"
    >
        <div
            class="flex w-full items-center justify-between gap-15 text-15 text-text-soften sm:gap-18 sm:text-18"
            :class="{ 'sm:justify-start': alignLeft }"
        >
            <span class="text-left">{{ normalized.name }}</span>

            <AppButton
                v-if="clickable && normalized.authorUser"
                :to="{ name: 'user-details', params: { name: normalized.authorUser.name } }"
                auto-width
            >
                <span class="text-right">{{ normalized.author }}</span>
            </AppButton>
            <span v-else class="text-right">{{ normalized.author }}</span>
        </div>
        <slot />
        <span class="wrap-anywhere text-center text-30 font-bold sm:text-36">{{
            normalized.title
        }}</span>
        <span class="text-center">{{ normalized.subtitle }}</span>
    </div>
</template>
