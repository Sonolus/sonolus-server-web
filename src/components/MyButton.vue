<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
    to?: RouteLocationRaw
    icon?: Component
    disabled?: boolean
}>()
</script>

<template>
    <component
        :is="to ? 'router-link' : 'button'"
        :to="to"
        class="flex select-none space-x-2 p-2 transition-colors sm:space-x-3 sm:p-3"
        :class="{
            'cursor-pointer bg-sonolus-ui-button-normal hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed':
                !disabled,
            'pointer-events-none bg-sonolus-ui-button-disabled text-sonolus-ui-text-disabled':
                disabled,
        }"
    >
        <component
            v-if="icon"
            :is="icon"
            class="h-5 w-5 fill-current sm:h-6 sm:w-6"
        />
        <span
            v-if="$slots.default"
            class="min-w-[4.5rem] flex-grow text-center sm:min-w-[6rem]"
        >
            <slot />
        </span>
    </component>
</template>
