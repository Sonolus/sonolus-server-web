<script setup lang="ts">
import type { Search } from 'sonolus-core'
import { useRouter, type LocationQuery, type RouteRecordName } from 'vue-router'
import SearchIcon from '../assets/search.svg?component'
import { useSearch } from '../composables/search'
import { useI18n } from '../i18n'
import MyButton from './MyButton.vue'

const props = defineProps<{
    name: RouteRecordName
    search: Search
    query: LocationQuery
    noText?: boolean
}>()

const { i18n } = useI18n()
const router = useRouter()
const states = useSearch()
const onClick = () => {
    states.push({
        name: props.name,
        search: props.search,
        query: props.query,
    })
    router.push({ name: 'search', params: { index: states.length - 1 } })
}
</script>

<template>
    <MyButton v-if="noText" :icon="SearchIcon" @click="onClick" />
    <MyButton v-else :icon="SearchIcon" @click="onClick">
        {{ i18n.common.search }}
    </MyButton>
</template>
