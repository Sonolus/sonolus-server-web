import type {
    BackgroundItem,
    EffectItem,
    EngineItem,
    ItemType,
    LevelItem,
    ParticleItem,
    PlaylistItem,
    PostItem,
    ReplayItem,
    RoomItem,
    SkinItem,
} from '@sonolus/core'

export type ItemMap = {
    room: RoomItem
    post: PostItem
    playlist: PlaylistItem
    level: LevelItem
    replay: ReplayItem
    skin: SkinItem
    background: BackgroundItem
    effect: EffectItem
    particle: ParticleItem
    engine: EngineItem
}

export type Item = ItemMap[ItemType]

export const paths = {
    room: 'rooms',
    post: 'posts',
    playlist: 'playlists',
    level: 'levels',
    replay: 'replays',
    skin: 'skins',
    background: 'backgrounds',
    effect: 'effects',
    particle: 'particles',
    engine: 'engines',
} as const
