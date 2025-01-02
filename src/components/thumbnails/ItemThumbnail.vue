<script setup lang="ts">
import type { ItemThumbnailProps } from '@/components/thumbnails/ItemThumbnail'
import { icons } from '@/icons'
import type { Item } from '@/utils/item'
import { thumbnailUrls } from '@/utils/thumbnailUrl'
import { computed, ref } from 'vue'

const props = defineProps<ItemThumbnailProps<Item>>()

const src = computed(() => {
    const url = thumbnailUrls[props.type](props.item as never)
    if (!url) return ''

    return url.startsWith('/') ? `${import.meta.env.BASE_URL}${url.slice(1)}` : url
})

const errorSrc = ref('')
</script>

<template>
    <img v-if="src !== errorSrc" class="size-full" :src alt="thumbnail" @error="errorSrc = src" />
    <component
        :is="icons[type]"
        v-else
        class="absolute left-1/4 top-1/4 size-1/2 fill-text-disabled"
    />
</template>
