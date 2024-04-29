<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    banner?: string
}>()

const url = computed(() =>
    props.banner?.startsWith('/')
        ? `${import.meta.env.BASE_URL}${props.banner.slice(1)}`
        : props.banner,
)
</script>

<template>
    <img
        v-if="url"
        class="banner fixed left-0 top-50 -z-10 h-150 w-[100vw] object-cover sm:top-60 sm:h-180"
        :src="url"
        alt="banner"
        inert
    />
</template>

<style scoped>
.banner {
    mask-image: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3), transparent);
}
</style>
