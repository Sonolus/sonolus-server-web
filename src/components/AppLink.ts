import { router } from '@/router'
import { setViewData } from '@/views/BaseView'
import type { RouteLocationNamedRaw } from 'vue-router'

export type AppLinkProps = {
    to: RouteLocationNamedRaw & { data?: unknown }
}

let id = 0

export const pushRoute = (to: AppLinkProps['to']) => {
    const routeId = ++id

    if (to.data !== undefined) {
        setViewData(routeId, to.data)
    }

    void router.push({
        ...to,
        force: true,
        state: {
            routeId,
        },
    })
}
