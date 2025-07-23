import EngineDetailsView from '@/views/details/EngineDetailsView.vue'
import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import LevelDetailsView from '@/views/details/LevelDetailsView.vue'
import PlaylistDetailsView from '@/views/details/PlaylistDetailsView.vue'
import PostDetailsView from '@/views/details/PostDetailsView.vue'
import ReplayDetailsView from '@/views/details/ReplayDetailsView.vue'

export const detailsViews = {
    room: ItemDetailsView,
    post: PostDetailsView,
    playlist: PlaylistDetailsView,
    level: LevelDetailsView,
    replay: ReplayDetailsView,
    skin: ItemDetailsView,
    background: ItemDetailsView,
    effect: ItemDetailsView,
    particle: ItemDetailsView,
    engine: EngineDetailsView,
} as const
