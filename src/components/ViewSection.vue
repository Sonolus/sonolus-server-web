<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <section class="flex flex-col gap-10 sm:gap-12">
        <h2 class="text-30 font-bold sm:text-36">{{ title }}</h2>
        <slot />
    </section>
</template>
