import type { Search } from 'sonolus-core'
import { reactive } from 'vue'
import type { LocationQuery, RouteRecordName } from 'vue-router'

export type SearchState = {
    name: RouteRecordName
    search: Search
    query: LocationQuery
}

const states = reactive([] as SearchState[])

export const useSearch = () => states
