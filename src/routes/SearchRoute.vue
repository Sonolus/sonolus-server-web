<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useSearch } from '../composables/search'
import { useI18n } from '../i18n'
import SearchView from '../views/SearchView.vue'
import BaseRoute from './BaseRoute.vue'

const route = useRoute()
const router = useRouter()

const states = useSearch()
const state = states[+route.params.index]
if (!state) {
    router.replace({ name: 'home' })
}

const { i18n } = useI18n()
</script>

<template>
    <BaseRoute :fallback="state" :title="i18n.routes.server.search.title">
        <template #loaded="{ data }">
            <SearchView :state="data" />
        </template>
    </BaseRoute>
</template>
