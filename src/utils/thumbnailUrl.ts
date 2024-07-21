import type { ItemPathType, ItemPathTypeMap } from '@/utils/item'

export const thumbnailUrls: {
    [K in ItemPathType]: (item: ItemPathTypeMap[K]) => string | undefined
} = {
    rooms: (item) => item.cover?.url ?? undefined,
    posts: (item) => item.thumbnail?.url ?? undefined,
    playlists: (item) => (item.thumbnail ?? item.levels[0]?.cover)?.url ?? undefined,
    levels: (item) => item.cover.url ?? undefined,
    replays: (item) => item.level.cover.url ?? undefined,
    skins: (item) => item.thumbnail.url ?? undefined,
    backgrounds: (item) => item.thumbnail.url ?? undefined,
    effects: (item) => item.thumbnail.url ?? undefined,
    particles: (item) => item.thumbnail.url ?? undefined,
    engines: (item) => item.thumbnail.url ?? undefined,
}
