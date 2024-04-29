<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import { useI18n, type I18n } from '@/i18n'
import type { ItemType } from '@/utils/item'
import type { Component } from 'vue'

defineProps<{
    type: ItemType
    icon: Component
    title: keyof I18n['routes']['server']['home']
}>()

const { i18n } = useI18n()
</script>

<template>
    <AppLink
        class="flex w-120 flex-col items-center bg-button-normal p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-144 sm:p-12"
        :to="{ name: `${type}-info` }"
    >
        <component :is="icon" class="size-60 fill-current sm:size-72" />
        <span class="mt-10 sm:mt-12">{{ i18n.routes.server.home[title] }}</span>
    </AppLink>
</template>
