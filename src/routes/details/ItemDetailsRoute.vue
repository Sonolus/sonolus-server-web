<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseRoute from '../BaseRoute.vue'

defineProps<{
    type: string
    i18nMessage: {
        loading: string
        error: (a0: string) => string
    }
}>()

const route = useRoute()

const title = ref(`${route.params.name}`)
</script>

<template>
    <BaseRoute
        :url="`/sonolus/${type}/${route.params.name}`"
        :title="title"
        @update="title = $event.item.title"
    >
        <template #loading>
            {{ i18nMessage.loading }}
        </template>

        <template #error>
            {{ i18nMessage.error(title) }}
        </template>

        <template #loaded="{ data }">
            <slot name="loaded" :data="data" />
        </template>
    </BaseRoute>
</template>
