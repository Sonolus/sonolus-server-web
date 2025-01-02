<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import TextInput from '@/components/TextInput.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { useI18n } from '@/i18n'
import IconAdvanced from '@/icons/IconAdvanced.vue'
import IconMore from '@/icons/IconMore.vue'
import IconSearch from '@/icons/IconSearch.vue'
import { paths } from '@/utils/item'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerItemInfo } from '@sonolus/core'
import { computed, ref } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${paths[type]}/info`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[type].info.error(import.meta.env.VITE_TITLE),

        title: ({ i18n, props: { type } }) => i18n.routes.server.infos[type].title,
        banner: ({ data }) => data?.banner?.url ?? undefined,
    }),
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    type: ItemType
    data: ServerItemInfo
}>()

const { i18n, i18nText } = useI18n()

const search = ref('')
const keywords = computed(() => search.value.trim())
</script>

<template>
    <AppForm>
        <TextInput
            v-if="data.searches"
            v-model="search"
            :icon="IconSearch"
            :placeholder="i18n.texts['#KEYWORDS_PLACEHOLDER']"
        />
        <div class="mt-10 flex flex-wrap justify-center gap-10 sm:mt-12 sm:gap-12">
            <AppButton
                v-if="data.searches?.length"
                :to="{ name: `${type}-search`, data }"
                :icon="IconAdvanced"
            >
                {{ i18n.routes.server.infos.advanced }}
            </AppButton>
            <AppButton
                :to="{ name: `${type}-list`, query: keywords ? { type: 'quick', keywords } : {} }"
                :icon="keywords ? IconSearch : IconMore"
                data-submit
            >
                {{ keywords ? i18n.common.search : i18n.common.more }}
            </AppButton>
        </div>
    </AppForm>

    <ViewSection v-for="(section, i) in data.sections" :key="i" :title="i18nText(section.title)">
        <ItemCard v-for="(item, j) in section.items" :key="j" :type="section.itemType" :item />
    </ViewSection>
</template>
