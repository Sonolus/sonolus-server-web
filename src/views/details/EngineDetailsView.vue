<script setup lang="ts">
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n } from '@/i18n'
import type { ViewEmit } from '@/views/BaseView'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView'
import ItemDetailsView from '@/views/details/ItemDetailsView.vue'
import { detailsViewOptions } from '@/views/details/detailsViewOptions'

defineOptions(detailsViewOptions)

defineProps<ItemDetailsViewProps<'engine'>>()

defineEmits<ViewEmit>()
</script>

<template>
    <ItemDetailsView v-bind="$props" @overlay="$emit('overlay', $event)">
        <ViewSection :title="i18n.routes.server.details.engine.skin.title">
            <ItemCard type="skin" :item="data.item.skin" />
        </ViewSection>
        <ViewSection :title="i18n.routes.server.details.engine.background.title">
            <ItemCard type="background" :item="data.item.background" />
        </ViewSection>
        <ViewSection :title="i18n.routes.server.details.engine.effect.title">
            <ItemCard type="effect" :item="data.item.effect" />
        </ViewSection>
        <ViewSection :title="i18n.routes.server.details.engine.particle.title">
            <ItemCard type="particle" :item="data.item.particle" />
        </ViewSection>
    </ItemDetailsView>
</template>
