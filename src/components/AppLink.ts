import type { RouteLocationNamedRaw } from 'vue-router'

export type AppLinkProps = {
    to: RouteLocationNamedRaw & { data?: unknown }
}
