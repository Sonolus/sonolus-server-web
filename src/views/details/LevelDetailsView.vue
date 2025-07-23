<script setup lang="ts">
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n } from '@/i18n'
import type { ViewEmit } from '@/views/BaseView'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps<'level'>>()

defineEmits<ViewEmit>()
</script>

<template>
    <ItemDetailsView v-bind="$props" @overlay="$emit('overlay', $event)">
        <ViewSection :title="i18n.routes.server.details.level.engine.title">
            <ItemCard type="engine" :item="data.item.engine" />
        </ViewSection>
    </ItemDetailsView>
</template>
