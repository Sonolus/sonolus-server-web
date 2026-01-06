<script setup lang="ts">
import type { ServerItemSection } from '@sonolus/core'
import { computed } from 'vue'
import AppButton from '../../components/AppButton.vue'
import ItemCard from '../../components/cards/ItemCard.vue'
import RichText from '../../components/RichText.vue'
import { i18n, i18nText } from '../../i18n'
import IconMore from '../../icons/IconMore.vue'
import IconSearch from '../../icons/IconSearch.vue'

const props = defineProps<{
    section: ServerItemSection
}>()

const searches = computed(() => {
    if (!props.section.search) return

    return {
        searches: [props.section.search],
    }
})

const searchQuery = computed(() => {
    if (!props.section.searchValues) return

    return Object.fromEntries(new URLSearchParams(props.section.searchValues))
})
</script>

<template>
    <section class="flex flex-col gap-10 sm:gap-12">
        <div class="flex gap-10 sm:gap-12">
            <h2 class="flex-grow text-30 font-bold sm:text-36">{{ i18nText(section.title) }}</h2>

            <AppButton
                v-if="searches"
                :to="{ name: `${section.itemType}-search`, data: searches }"
                :icon="IconSearch"
            />
            <AppButton
                v-if="searchQuery"
                :to="{ name: `${section.itemType}-list`, query: searchQuery }"
                :icon="IconMore"
                data-submit
            />
        </div>

        <RichText v-if="section.description" :text="section.description" />

        <ItemCard v-for="(item, key) in section.items" :key :type="section.itemType" :item />

        <div v-if="searches || searchQuery" class="flex justify-center gap-10 sm:gap-12">
            <AppButton
                v-if="searches"
                :to="{ name: `${section.itemType}-search`, data: searches }"
                :icon="IconSearch"
            >
                {{ i18n.common.search }}
            </AppButton>
            <AppButton
                v-if="searchQuery"
                :to="{ name: `${section.itemType}-list`, query: searchQuery }"
                :icon="IconMore"
                data-submit
            >
                {{ i18n.common.more }}
            </AppButton>
        </div>
    </section>
</template>
