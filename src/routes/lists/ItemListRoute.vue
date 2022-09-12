<script setup lang="ts">
import { useListRoute } from '../../composables/list-route'
import BaseRoute from '../BaseRoute.vue'

defineProps<{
    type: string
    title: string
    i18nMessage: {
        loading: string
        error: (a0: string) => string
    }
}>()

const { search, page } = useListRoute()
</script>

<template>
    <BaseRoute :url="`/sonolus/${type}/list${search}`" :title="title">
        <template #loading>
            {{ i18nMessage.loading }}
        </template>

        <template #error>
            {{ i18nMessage.error(`${page + 1}`) }}
        </template>

        <template #loaded="{ data }">
            <slot name="loaded" :data="data" />
        </template>
    </BaseRoute>
</template>
