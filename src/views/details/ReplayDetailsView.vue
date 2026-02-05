<script setup lang="ts">
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n } from '@/i18n'
import type { ViewEmit } from '@/views/BaseView'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import SimpleItemDetailsView from './SimpleItemDetailsView.vue'

defineProps<ItemDetailsViewProps<'replay'>>()

defineEmits<ViewEmit>()
</script>

<template>
    <SimpleItemDetailsView
        v-bind="$props"
        @reload="$emit('reload')"
        @overlay="$emit('overlay', $event)"
    >
        <ViewSection :title="i18n.routes.server.details.replay.level.title">
            <ItemCard type="level" :item="data.item.level" />
        </ViewSection>
    </SimpleItemDetailsView>
</template>
