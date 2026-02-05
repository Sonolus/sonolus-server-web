<script lang="ts">
import { type ViewEmit } from '@/views/BaseView'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import type { ItemType } from '@sonolus/core'
import type { Component } from 'vue'
import { paths } from '../../utils/item'
import { thumbnailUrls } from '../../utils/thumbnailUrl'
import { viewOptions } from '../viewOptions'
import EngineDetailsView from './EngineDetailsView.vue'
import LevelDetailsView from './LevelDetailsView.vue'
import PlaylistDetailsView from './PlaylistDetailsView.vue'
import PostDetailsView from './PostDetailsView.vue'
import ReplayDetailsView from './ReplayDetailsView.vue'
import SimpleItemDetailsView from './SimpleItemDetailsView.vue'
import UserDetailsView from './UserDetailsView.vue'

const views: Partial<Record<ItemType, Component>> = {
    post: PostDetailsView,
    playlist: PlaylistDetailsView,
    level: LevelDetailsView,
    replay: ReplayDetailsView,
    engine: EngineDetailsView,
    user: UserDetailsView,
}
</script>

<script setup lang="ts">
defineOptions(
    viewOptions<ItemDetailsViewProps>({
        url: ({ type, name }) => `/${paths[type]}/${name}`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].details.loading,
        error: ({ i18n, props: { type, name } }) =>
            i18n.clients.customServer[type].details.error(name),

        title: ({ props: { name, data } }) => data?.item.title ?? name,
        banner: ({ type, data }) => data && thumbnailUrls[type](data.item as never),
    }),
)

defineProps<ItemDetailsViewProps>()

defineEmits<ViewEmit>()
</script>

<template>
    <component
        :is="views[type] ?? SimpleItemDetailsView"
        :type
        :name
        :data
        @reload="$emit('reload')"
        @overlay="$emit('overlay', $event)"
    />
</template>
