<script setup lang="ts">
import type { ServerItemCommunityComment } from '@sonolus/core'

defineProps<{
    comment: ServerItemCommunityComment
}>()
</script>

<template>
    <div class="bg-button-disabled p-10 sm:p-12">
        <div
            class="flex h-15 justify-between gap-15 text-15 text-text-soften sm:h-18 sm:gap-18 sm:text-18"
        >
            <span class="text-left">{{ comment.author }}</span>
            <span class="text-right">{{ new Date(comment.time).toLocaleString() }}</span>
        </div>
        <div class="mt-5">{{ comment.content }}</div>
    </div>
</template>
