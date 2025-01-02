export let viewData: { routeId: unknown; data: unknown } | undefined

export const setViewData = (routeId: unknown, data: unknown) => (viewData = { routeId, data })
