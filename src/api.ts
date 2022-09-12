import type { ResourceType, SRL } from 'sonolus-core'

export const baseUrl = import.meta.env.BASE_URL.slice(0, -1)

export const toUrl = (srl: SRL<ResourceType>) => {
    if (!srl.url.startsWith('/')) return srl.url

    return baseUrl + srl.url
}
