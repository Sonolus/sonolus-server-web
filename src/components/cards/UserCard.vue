<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { i18nText } from '@/i18n'
import type { UserItem } from '@sonolus/core'
import IconUser from '../../icons/IconUser.vue'

defineProps<{
    item: UserItem
}>()
</script>

<template>
    <AppLink
        class="flex w-full items-center gap-10 bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-12 sm:p-12"
        :to="{ name: 'user-details', params: { name: item.name } }"
    >
        <IconUser class="size-20 flex-shrink-0 fill-text-disabled sm:size-24" />
        <span class="flex-grow">{{ item.title }}</span>
        <div
            v-for="(tag, key) in item.tags"
            :key
            class="flex gap-2.5 bg-button-disabled p-2.5 sm:gap-3 sm:p-3"
        >
            <component :is="dynamicIcons[tag.icon ?? '']" class="size-15 fill-current sm:size-18" />
            <span v-if="tag.title" class="px-2.5 text-15 sm:px-3 sm:text-18">{{
                i18nText(tag.title)
            }}</span>
        </div>
    </AppLink>
</template>
