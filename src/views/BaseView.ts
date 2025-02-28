export type OverlayState =
    | {
          type: 'loading' | 'error'
          getMessage: () => string
      }
    | {
          type: 'confirm'
          getMessage: () => string
          onConfirm: () => void
      }

export type OverlayEmit = {
    overlay: [state?: OverlayState]
}

export type ViewEmit = OverlayEmit & {
    reload: []
}

export let viewData: { routeId: unknown; data: unknown } | undefined

export const setViewData = (routeId: unknown, data: unknown) => (viewData = { routeId, data })
