<script setup lang="ts">
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n } from '@/i18n'
import type { ViewEmit } from '@/views/BaseView'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps<'playlist'>>()

defineEmits<ViewEmit>()
</script>

<template>
    <ItemDetailsView v-bind="$props" @overlay="$emit('overlay', $event)">
        <ViewSection :title="i18n.routes.server.details.playlist.levels.title">
            <ItemCard v-for="(item, key) in data.item.levels" :key type="level" :item />
        </ViewSection>
    </ItemDetailsView>
</template>
