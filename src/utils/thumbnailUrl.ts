import type { ItemMap } from '@/utils/item'
import type { ItemType } from '@sonolus/core'

export const thumbnailUrls: {
    [K in ItemType]: (item: ItemMap[K]) => string | undefined
} = {
    room: (item) => item.cover?.url ?? undefined,
    post: (item) => item.thumbnail?.url ?? undefined,
    playlist: (item) => (item.thumbnail ?? item.levels[0]?.cover)?.url ?? undefined,
    level: (item) => item.cover.url ?? undefined,
    replay: (item) => item.level.cover.url ?? undefined,
    skin: (item) => item.thumbnail.url ?? undefined,
    background: (item) => item.thumbnail.url ?? undefined,
    effect: (item) => item.thumbnail.url ?? undefined,
    particle: (item) => item.thumbnail.url ?? undefined,
    engine: (item) => item.thumbnail.url ?? undefined,
}
