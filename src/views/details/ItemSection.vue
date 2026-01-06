<script setup lang="ts">
import type { ServerItemSection } from '@sonolus/core'
import ItemCard from '../../components/cards/ItemCard.vue'
import RichText from '../../components/RichText.vue'
import { i18nText } from '../../i18n'

defineProps<{
    section: ServerItemSection
}>()
</script>

<template>
    <section class="flex flex-col gap-10 sm:gap-12">
        <h2 class="text-30 font-bold sm:text-36">{{ i18nText(section.title) }}</h2>

        <RichText v-if="section.description" :text="section.description" />

        <ItemCard v-for="(item, key) in section.items" :key :type="section.itemType" :item />
    </section>
</template>
