import ItemThumbnail from '@/components/thumbnails/ItemThumbnail.vue'
import LevelThumbnail from '@/components/thumbnails/LevelThumbnail.vue'
import ReplayThumbnail from '@/components/thumbnails/ReplayThumbnail.vue'

export const thumbnails = {
    rooms: ItemThumbnail,
    posts: ItemThumbnail,
    playlists: ItemThumbnail,
    levels: LevelThumbnail,
    replays: ReplayThumbnail,
    skins: ItemThumbnail,
    backgrounds: ItemThumbnail,
    effects: ItemThumbnail,
    particles: ItemThumbnail,
    engines: ItemThumbnail,
} as const
