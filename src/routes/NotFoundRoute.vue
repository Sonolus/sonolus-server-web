<script setup lang="ts">
import { useI18n } from '../i18n'
import BaseRoute from './BaseRoute.vue'

const { i18n } = useI18n()
</script>

<template>
    <BaseRoute title="404">
        <template #error>
            {{ i18n.notFound.description }}
        </template>
    </BaseRoute>
</template>
