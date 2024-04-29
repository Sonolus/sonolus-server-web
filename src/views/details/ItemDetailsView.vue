<script lang="ts">
export type ItemDetailsViewProps<T extends ItemType = ItemType> = {
    type: T
    name: string
    data: ItemDetails<ItemTypeMap[T]>
}
</script>

<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import ItemHeader from '@/components/headers/ItemHeader.vue'
import { thumbnails } from '@/components/thumbnails'
import { useI18n } from '@/i18n'
import type { ItemType, ItemTypeMap } from '@/utils/item'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'
import type { ItemDetails } from '@sonolus/core'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps>()

const { i18n, i18nText } = useI18n()
</script>

<template>
    <ItemHeader :type :item="data.item" />

    <div class="flex flex-col items-center justify-evenly gap-30 sm:flex-row sm:gap-0">
        <div class="relative size-150 sm:size-180">
            <component :is="thumbnails[type]" :type :item="data.item" full-size />
        </div>
        <OpenInSonolus />
    </div>

    <ViewSection :title="i18n.routes.server.details.description.title">
        <p class="whitespace-break-spaces">{{ data.description }}</p>
    </ViewSection>

    <ViewSection :title="i18n.routes.server.details.tags.title">
        <div class="flex flex-wrap gap-10 sm:gap-12">
            <span
                v-for="(tag, key) in data.item.tags"
                :key
                class="bg-button-disabled px-7.5 py-5 sm:px-9 sm:py-6"
            >
                {{ i18nText(tag.title) }}
            </span>
        </div>
    </ViewSection>

    <slot />

    <ViewSection v-for="(section, i) in data.sections" :key="i" :title="i18nText(section.title)">
        <ItemCard v-for="(item, j) in section.items" :key="j" :type :item />
    </ViewSection>
</template>
