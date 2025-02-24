<script setup lang="ts">
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import ItemHeader from '@/components/headers/ItemHeader.vue'
import { thumbnails } from '@/components/thumbnails'
import { dynamicIcons } from '@/dynamicIcons'
import { i18n, i18nText } from '@/i18n'
import { type OverlayEmit } from '@/views/BaseView'
import ItemActions from '@/views/details/ItemActions.vue'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import CommunitySection from '@/views/details/community/CommunitySection.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'
import LeaderboardSection from '@/views/details/leaderboard/LeaderboardSection.vue'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps>()

defineEmits<OverlayEmit>()
</script>

<template>
    <ItemHeader :type :item="data.item" />

    <div class="flex flex-col items-center justify-evenly gap-30 sm:flex-row sm:gap-0">
        <div class="relative size-150 sm:size-180">
            <component :is="thumbnails[type]" :type :item="data.item" full-size />
        </div>
        <OpenInSonolus />
    </div>

    <ItemActions v-bind="$props" @overlay="$emit('overlay', $event)" />

    <ViewSection :title="i18n.routes.server.details.description.title">
        <p v-if="data.description" class="whitespace-break-spaces">{{ data.description }}</p>
        <div
            v-else
            class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
        >
            {{ i18n.routes.server.details.description.noDescription }}
        </div>
    </ViewSection>

    <ViewSection :title="i18n.routes.server.details.tags.title">
        <div v-if="data.item.tags.length" class="flex flex-wrap gap-10 sm:gap-12">
            <div
                v-for="(tag, key) in data.item.tags"
                :key
                class="flex gap-5 bg-button-disabled p-5 sm:gap-6 sm:p-6"
            >
                <component
                    :is="dynamicIcons[tag.icon ?? '']"
                    class="size-20 fill-current sm:size-24"
                />
                <span class="px-5 sm:px-6">{{ i18nText(tag.title) }}</span>
            </div>
        </div>
        <div
            v-else
            class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
        >
            {{ i18n.routes.server.details.tags.noTags }}
        </div>
    </ViewSection>

    <slot />

    <CommunitySection v-if="data.hasCommunity" :type :name />

    <LeaderboardSection
        v-if="data.leaderboards.length"
        :type
        :name
        :leaderboards="data.leaderboards"
    />

    <ViewSection v-for="(section, i) in data.sections" :key="i" :title="i18nText(section.title)">
        <ItemCard v-for="(item, j) in section.items" :key="j" :type="section.itemType" :item />
    </ViewSection>
</template>
