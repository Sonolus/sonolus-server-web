<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import ItemHeader from '@/components/headers/ItemHeader.vue'
import { thumbnails } from '@/components/thumbnails'
import { dynamicIcons } from '@/dynamicIcons'
import { useI18n } from '@/i18n'
import type { Item } from '@/utils/item'
import type { ItemType } from '@sonolus/core'

defineProps<{
    type: ItemType
    item: Item
}>()

const { i18nText } = useI18n()
</script>

<template>
    <AppLink
        class="flex w-full gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-12 sm:p-12"
        :to="{ name: `${type}-details`, params: { name: item.name } }"
    >
        <div class="relative hidden flex-shrink-0 sm:block sm:size-120">
            <component :is="thumbnails[type]" :type :item />
        </div>
        <div class="flex-grow">
            <ItemHeader :type :item>
                <div class="relative my-10 size-100 sm:hidden">
                    <component :is="thumbnails[type]" :type :item />
                </div>
            </ItemHeader>
            <div class="mt-10 flex flex-wrap justify-center gap-5 sm:mt-12 sm:gap-6">
                <div
                    v-for="(tag, key) in item.tags"
                    :key
                    class="flex gap-2.5 bg-button-disabled p-2.5 sm:gap-3 sm:p-3"
                >
                    <component
                        :is="dynamicIcons[tag.icon ?? '']"
                        class="size-15 fill-current sm:size-18"
                    />
                    <span class="px-2.5 text-15 sm:px-3 sm:text-18">{{ i18nText(tag.title) }}</span>
                </div>
            </div>
        </div>
    </AppLink>
</template>
