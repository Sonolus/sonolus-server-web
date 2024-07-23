import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import PlaylistDetailsView from '@/views/details/PlaylistDetailsView.vue'
import PostDetailsView from '@/views/details/PostDetailsView.vue'

export const detailsViews = {
    room: ItemDetailsView,
    post: PostDetailsView,
    playlist: PlaylistDetailsView,
    level: ItemDetailsView,
    replay: ItemDetailsView,
    skin: ItemDetailsView,
    background: ItemDetailsView,
    effect: ItemDetailsView,
    particle: ItemDetailsView,
    engine: ItemDetailsView,
} as const
