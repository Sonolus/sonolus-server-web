<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import RichText from '@/components/RichText.vue'
import ItemHeader from '@/components/headers/ItemHeader.vue'
import { thumbnails } from '@/components/thumbnails'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import type { ViewEmit } from '@/views/BaseView'
import ItemActions from '@/views/details/ItemActions.vue'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import CommunitySection from '@/views/details/community/CommunitySection.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'
import LeaderboardSection from '@/views/details/leaderboard/LeaderboardSection.vue'
import ItemSection from './ItemSection.vue'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps<'post'>>()

defineEmits<ViewEmit>()
</script>

<template>
    <div class="flex flex-col items-center gap-30 sm:flex-row sm:items-start sm:gap-36">
        <div class="w-full flex-grow">
            <ItemHeader :type :item="data.item" align-left />
            <div
                v-if="data.item.tags.length"
                class="mt-10 flex flex-wrap justify-center gap-5 sm:mt-12 sm:justify-start sm:gap-6"
            >
                <div
                    v-for="(tag, key) in data.item.tags"
                    :key
                    class="flex gap-2.5 bg-button-disabled p-2.5 sm:gap-3 sm:p-3"
                >
                    <component
                        :is="dynamicIcons[tag.icon ?? '']"
                        class="size-15 fill-current sm:size-18"
                    />
                    <span class="px-2.5 text-15 sm:px-3 sm:text-18">{{ i18nText(tag.title) }}</span>
                </div>
            </div>
            <div
                v-else
                class="flex h-20 items-center text-20 text-text-disabled sm:h-24 sm:text-24"
            >
                {{ i18n.routes.server.details.tags.noTags }}
            </div>
        </div>
        <div class="relative size-100 flex-shrink-0 sm:size-120">
            <component :is="thumbnails[type]" :type :item="data.item" />
        </div>
    </div>

    <RichText v-if="data.description" :text="data.description" />
    <div
        v-else
        class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
    >
        {{ i18n.routes.server.details.description.noDescription }}
    </div>

    <div class="flex justify-center">
        <OpenInSonolus />
    </div>

    <ItemActions v-bind="$props" @reload="$emit('reload')" @overlay="$emit('overlay', $event)" />

    <CommunitySection
        v-if="data.hasCommunity"
        :type
        :name
        :title="data.item.title"
        @overlay="$emit('overlay', $event)"
    />

    <LeaderboardSection
        v-if="data.leaderboards.length"
        :type
        :name
        :leaderboards="data.leaderboards"
    />

    <ItemSection v-for="(section, key) in data.sections" :key :section />
</template>
