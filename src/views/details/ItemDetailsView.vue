<script setup lang="ts">
import type { ItemDetails } from 'sonolus-core'
import OpenInSonolus from '../../components/OpenInSonolus.vue'
import { useI18n } from '../../i18n'

defineProps<{
    type: string
    data: ItemDetails<any>
    name: string
    title: string
    subtitle: string
    author: string
}>()

const { i18n } = useI18n()
</script>

<template>
    <div
        class="flex w-full flex-col items-center whitespace-nowrap text-center"
    >
        <div
            class="flex w-full justify-between space-x-2 text-2xs text-sonolus-ui-text-soften sm:space-x-3 sm:text-xs"
        >
            <div class="overflow-hidden text-ellipsis">#{{ name }}</div>
            <div class="overflow-hidden text-ellipsis">
                {{ author }}
            </div>
        </div>
        <h1
            class="mt-2 w-full overflow-hidden text-ellipsis py-1 text-xl font-bold sm:py-1.5 sm:text-3xl"
        >
            {{ title }}
        </h1>
        <div class="mt-1 mb-4 w-full overflow-hidden text-ellipsis sm:mb-0">
            {{ subtitle }}
        </div>
    </div>

    <div class="flex flex-col items-center justify-center sm:flex-row">
        <div class="relative h-48 w-48 flex-shrink-0">
            <slot name="thumbnail" />
        </div>
        <div class="mt-8 sm:mt-0 sm:ml-24">
            <OpenInSonolus :deep-link="`/${type}/${name}`" />
        </div>
    </div>

    <div class="flex flex-col space-y-2 sm:space-y-3">
        <h2 class="py-1 text-xl font-bold sm:py-1.5 sm:text-3xl">
            {{ i18n.routes.server.itemDetails.description.title }}
        </h2>
        <p class="whitespace-pre-wrap">
            {{ data.description }}
        </p>
    </div>

    <div class="flex flex-col space-y-2 sm:space-y-3">
        <h2 class="py-1 text-xl font-bold sm:py-1.5 sm:text-3xl">
            {{ i18n.routes.server.itemDetails.recommended.title }}
        </h2>
        <template v-for="(item, index) in data.recommended" :key="index">
            <slot name="recommended" :item="item" />
        </template>
    </div>
</template>
