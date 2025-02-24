import { ref } from 'vue'

export type OverlayState = {
    type: 'loading' | 'error'
    getMessage: () => string
}

export type OverlayEmit = {
    overlay: [state?: OverlayState]
}

export let viewData: { routeId: unknown; data: unknown } | undefined

export const setViewData = (routeId: unknown, data: unknown) => (viewData = { routeId, data })

export const viewReload = ref(0)
