<script setup lang="ts">
defineProps<{
    routeName: string
    name: string
    title: string
    subtitle: string
    author: string
}>()
</script>

<template>
    <RouterLink
        :to="{ name: routeName, params: { name } }"
        class="flex cursor-pointer select-none whitespace-nowrap bg-sonolus-ui-button-normal p-2 text-center transition-colors hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3"
    >
        <div class="relative mr-3 hidden h-24 w-24 flex-shrink-0 sm:block">
            <slot />
        </div>
        <div class="flex w-full flex-col items-center">
            <div
                class="flex w-full justify-between space-x-2 text-2xs text-sonolus-ui-text-soften sm:space-x-3 sm:text-xs"
            >
                <div class="overflow-hidden text-ellipsis">#{{ name }}</div>
                <div class="overflow-hidden text-ellipsis">
                    {{ author }}
                </div>
            </div>
            <div class="relative mt-4 h-24 w-24 flex-shrink-0 sm:hidden">
                <slot />
            </div>
            <div
                class="mt-4 w-full overflow-hidden text-ellipsis text-lg font-bold sm:mt-2 sm:text-2xl"
            >
                {{ title }}
            </div>
            <div class="mt-1 mb-2 w-full overflow-hidden text-ellipsis sm:mb-0">
                {{ subtitle }}
            </div>
        </div>
    </RouterLink>
</template>
