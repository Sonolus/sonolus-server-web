<script setup lang="ts">
import { getOpenInSonolusUrl } from '@/components/OpenInSonolus'
import { i18n } from '@/i18n'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
    url?: string
    noText?: boolean
}>()

const route = useRoute()

const href = computed(() => props.url ?? getOpenInSonolusUrl(route.fullPath))
</script>

<template>
    <a
        class="flex items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-6 sm:p-6"
        :class="{ 'min-w-120 sm:min-w-144': !noText }"
        :href
        target="_blank"
        tabindex="0"
    >
        <img
            class="size-20 flex-shrink-0 select-none sm:size-24"
            src="@/icons/IconSonolus.png"
            alt="Sonolus"
        />
        <span v-if="!noText" class="flex-grow px-2.5 text-center sm:px-3">
            {{ i18n.openInSonolus }}
        </span>
    </a>
</template>
