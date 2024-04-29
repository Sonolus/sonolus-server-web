import type {
    BackgroundItem,
    EffectItem,
    EngineItem,
    LevelItem,
    ParticleItem,
    PlaylistItem,
    PostItem,
    ReplayItem,
    RoomItem,
    SkinItem,
} from '@sonolus/core'

export type ItemTypeMap = {
    rooms: RoomItem
    posts: PostItem
    playlists: PlaylistItem
    levels: LevelItem
    replays: ReplayItem
    skins: SkinItem
    backgrounds: BackgroundItem
    effects: EffectItem
    particles: ParticleItem
    engines: EngineItem
}

export type ItemType = keyof ItemTypeMap & string

export type Item = ItemTypeMap[ItemType]
