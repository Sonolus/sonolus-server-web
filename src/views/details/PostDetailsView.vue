<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import ItemHeader from '@/components/headers/ItemHeader.vue'
import { thumbnails } from '@/components/thumbnails'
import { useI18n } from '@/i18n'
import ItemCommunitySection from '@/views/details/ItemCommunitySection.vue'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps<'posts'>>()

const { i18nText } = useI18n()
</script>

<template>
    <div class="flex flex-col items-center gap-30 sm:flex-row sm:items-start sm:gap-36">
        <div class="w-full flex-grow">
            <ItemHeader :type :item="data.item" align-left />
            <div
                class="mt-10 flex flex-wrap justify-center gap-5 sm:mt-12 sm:justify-start sm:gap-6"
            >
                <span
                    v-for="(tag, key) in data.item.tags"
                    :key
                    class="bg-button-disabled px-5 py-2.5 text-15 sm:px-6 sm:py-3 sm:text-18"
                >
                    {{ i18nText(tag.title) }}
                </span>
            </div>
        </div>
        <div class="relative size-100 flex-shrink-0 sm:size-120">
            <component :is="thumbnails[type]" :type :item="data.item" />
        </div>
    </div>

    <p class="whitespace-break-spaces">{{ data.description }}</p>

    <div class="flex justify-center">
        <OpenInSonolus />
    </div>

    <ItemCommunitySection v-if="data.hasCommunity" :type :name />

    <ViewSection v-for="(section, i) in data.sections" :key="i" :title="i18nText(section.title)">
        <ItemCard v-for="(item, j) in section.items" :key="j" :type :item />
    </ViewSection>
</template>
