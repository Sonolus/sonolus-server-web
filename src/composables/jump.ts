import { reactive } from 'vue'
import type { LocationQuery, RouteRecordName } from 'vue-router'

export type JumpState = {
    name: RouteRecordName
    query: LocationQuery
    page: number
    pageCount: number
}

const states = reactive([] as JumpState[])

export const useJump = () => states
