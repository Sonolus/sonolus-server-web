<script setup lang="ts">
import type { ResourceType, SRL } from 'sonolus-core'
import { ref, watch, type Component } from 'vue'
import { toUrl } from '../../api'

const props = defineProps<{
    thumbnail: SRL<ResourceType>
    fallback: Component
}>()

const isError = ref(false)
watch(props.thumbnail, () => (isError.value = false))
</script>

<template>
    <component
        v-if="isError"
        :is="fallback"
        class="absolute left-1/4 top-1/4 h-1/2 w-1/2 fill-current text-sonolus-ui-text-disabled"
    />
    <img
        v-else
        class="h-full w-full"
        :src="toUrl(thumbnail)"
        alt="Thumbnail"
        @error="isError = true"
    />
</template>
