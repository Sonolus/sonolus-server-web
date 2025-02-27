export type OverlayState = {
    type: 'loading' | 'error'
    getMessage: () => string
}

export type ViewEmit = {
    reload: []
    overlay: [state?: OverlayState]
}

export let viewData: { routeId: unknown; data: unknown } | undefined

export const setViewData = (routeId: unknown, data: unknown) => (viewData = { routeId, data })
