<script setup lang="ts">
import { useI18n } from '@/i18n'
import IconAngleDown from '@/icons/IconAngleDown.vue'
import IconAngleUp from '@/icons/IconAngleUp.vue'
import type { ServerOption } from '@sonolus/core'
import { ref } from 'vue'

defineProps<{
    option: ServerOption
    displayValue: string
    isModified?: boolean
}>()

const { i18nText } = useI18n()

const isExpanded = ref(false)
</script>

<template>
    <div>
        <button
            class="flex w-full p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:p-6"
            :class="isExpanded || isModified ? 'bg-button-normal' : 'bg-button-soften'"
            type="button"
            @click="isExpanded = !isExpanded"
        >
            <div class="flex-shrink-0">{{ i18nText(option.name) }}</div>
            <div
                class="ml-20 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-right sm:ml-24"
            >
                {{ displayValue }}
            </div>
            <component
                :is="isExpanded ? IconAngleUp : IconAngleDown"
                class="ml-10 size-20 flex-shrink-0 fill-current sm:ml-12 sm:size-24"
            />
        </button>
        <div
            class="grid bg-button-disabled transition-[grid-template-rows]"
            :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }"
            :inert="!isExpanded"
        >
            <div class="overflow-hidden">
                <div class="p-30 sm:p-36">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
