import type { ItemPathType, ItemPathTypeMap } from '@/utils/item'

export const thumbnailUrls: {
    [K in ItemPathType]: (item: ItemPathTypeMap[K]) => string | undefined
} = {
    rooms: (item) => item.cover?.url,
    posts: (item) => item.thumbnail?.url,
    playlists: (item) => (item.thumbnail ?? item.levels[0]?.cover)?.url,
    levels: (item) => item.cover.url,
    replays: (item) => item.level.cover.url,
    skins: (item) => item.thumbnail.url,
    backgrounds: (item) => item.thumbnail.url,
    effects: (item) => item.thumbnail.url,
    particles: (item) => item.thumbnail.url,
    engines: (item) => item.thumbnail.url,
}
