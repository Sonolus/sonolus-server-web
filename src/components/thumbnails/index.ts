import ItemThumbnail from '@/components/thumbnails/ItemThumbnail.vue'
import LevelThumbnail from '@/components/thumbnails/LevelThumbnail.vue'
import ReplayThumbnail from '@/components/thumbnails/ReplayThumbnail.vue'

export const thumbnails = {
    room: ItemThumbnail,
    post: ItemThumbnail,
    playlist: ItemThumbnail,
    level: LevelThumbnail,
    replay: ReplayThumbnail,
    skin: ItemThumbnail,
    background: ItemThumbnail,
    effect: ItemThumbnail,
    particle: ItemThumbnail,
    engine: ItemThumbnail,
} as const
