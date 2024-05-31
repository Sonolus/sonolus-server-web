<script setup lang="ts">
import type { AppLinkProps } from '@/components/AppLink.vue'
import AppLink from '@/components/AppLink.vue'
import type { Component } from 'vue'

defineProps<
    AppLinkProps & {
        icon?: Component
        disabled?: boolean
    }
>()
</script>

<template>
    <AppLink
        class="flex items-center gap-5 p-5 transition-colors sm:gap-6 sm:p-6"
        :class="[
            { 'min-w-120 sm:min-w-144': $slots.default },
            disabled
                ? 'bg-button-disabled text-text-disabled'
                : 'bg-button-normal hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed',
        ]"
        v-bind="$props"
        :inert="disabled"
    >
        <component :is="icon" v-if="icon" class="size-20 flex-shrink-0 fill-current sm:size-24" />
        <span v-if="$slots.default" class="flex-grow px-2.5 text-center sm:px-3">
            <slot />
        </span>
    </AppLink>
</template>
