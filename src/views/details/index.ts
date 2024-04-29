import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import PlaylistDetailsView from '@/views/details/PlaylistDetailsView.vue'
import PostDetailsView from '@/views/details/PostDetailsView.vue'

export const detailsViews = {
    rooms: ItemDetailsView,
    posts: PostDetailsView,
    playlists: PlaylistDetailsView,
    levels: ItemDetailsView,
    replays: ItemDetailsView,
    skins: ItemDetailsView,
    backgrounds: ItemDetailsView,
    effects: ItemDetailsView,
    particles: ItemDetailsView,
    engines: ItemDetailsView,
} as const
