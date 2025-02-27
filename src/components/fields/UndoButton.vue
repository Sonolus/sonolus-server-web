<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import IconUndo from '@/icons/IconUndo.vue'

defineProps<{
    isModified: boolean
}>()
</script>

<template>
    <AppButton :icon="IconUndo" :disabled="!isModified" />
</template>
