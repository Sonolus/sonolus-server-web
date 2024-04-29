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
        class="flex items-center gap-5 p-5 sm:gap-6 sm:p-6"
        :class="[
            { 'min-w-120 sm:min-w-144': $slots.default },
            disabled
                ? 'bg-button-disabled'
                : 'bg-button-normal transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed',
        ]"
        v-bind="$props"
        :inert="disabled"
    >
        <component
            :is="icon"
            v-if="icon"
            class="size-20 flex-shrink-0 sm:size-24"
            :class="disabled ? 'fill-text-disabled' : 'fill-text-normal'"
        />
        <span
            v-if="$slots.default"
            class="flex-grow px-2.5 text-center sm:px-3"
            :class="disabled ? 'text-text-disabled' : 'text-text-normal'"
        >
            <slot />
        </span>
    </AppLink>
</template>
