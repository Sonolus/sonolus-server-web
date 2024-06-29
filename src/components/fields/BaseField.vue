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
            class="flex w-full gap-10 p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-12 sm:p-6"
            :class="isExpanded || isModified ? 'bg-button-normal' : 'bg-button-soften'"
            type="button"
            @click="isExpanded = !isExpanded"
        >
            <div class="ml-2.5 flex-shrink-0 sm:ml-3">{{ i18nText(option.name) }}</div>
            <div
                class="ml-10 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-right sm:ml-12"
            >
                {{ displayValue }}
            </div>
            <component
                :is="isExpanded ? IconAngleUp : IconAngleDown"
                class="size-20 flex-shrink-0 fill-current sm:size-24"
            />
        </button>
        <div
            class="grid bg-button-disabled transition-[grid-template-rows]"
            :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }"
            :inert="!isExpanded"
        >
            <div class="overflow-hidden">
                <div class="p-30 sm:p-36">
                    <div>
                        <slot />
                    </div>
                    <div v-if="option.description" class="mt-30 whitespace-break-spaces sm:mt-36">
                        <span>{{ option.description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
