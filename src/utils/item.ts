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

export type ItemPathTypeMap = {
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

export type ItemPathType = keyof ItemPathTypeMap

export type Item = ItemPathTypeMap[ItemPathType]
