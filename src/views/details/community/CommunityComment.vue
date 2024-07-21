<script setup lang="ts">
import { dynamicIcons } from '@/dynamicIcons'
import IconCommunity from '@/icons/IconCommunity.vue'
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
        <div v-if="comment.actions.length" class="mt-10 flex justify-end">
            <div
                v-for="(action, i) in comment.actions"
                :key="i"
                class="bg-button-disabled p-5 sm:p-6"
                inert
            >
                <component
                    :is="dynamicIcons[action.icon ?? ''] ?? IconCommunity"
                    class="size-20 flex-shrink-0 fill-text-disabled sm:size-24"
                />
            </div>
        </div>
    </div>
</template>
