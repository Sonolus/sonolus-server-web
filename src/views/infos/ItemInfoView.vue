<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import TextInput from '@/components/TextInput.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { useI18n } from '@/i18n'
import IconAdvanced from '@/icons/IconAdvanced.vue'
import IconMore from '@/icons/IconMore.vue'
import IconPlus from '@/icons/IconPlus.vue'
import IconSearch from '@/icons/IconSearch.vue'
import type { ItemPathType } from '@/utils/item'
import { names } from '@/utils/name'
import { viewOptions } from '@/views/viewOptions'
import type { ServerItemInfo } from '@sonolus/core'
import { computed, ref } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${type}/info`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[names[type]].info.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[names[type]].info.error(import.meta.env.VITE_TITLE),

        title: ({ i18n, props: { type } }) => i18n.routes.server.infos[names[type]].title,
        banner: ({ data }) => data?.banner?.url ?? undefined,
    }),
)

const props = defineProps<{
    type: ItemPathType
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
        <div class="mt-10 flex justify-center gap-10 sm:mt-12 sm:gap-12">
            <div
                v-if="data.creates"
                class="flex min-w-120 gap-5 bg-button-disabled p-5 text-text-disabled sm:min-w-144 sm:gap-6 sm:p-6"
                inert
            >
                <IconPlus class="size-20 flex-shrink-0 fill-current sm:size-24" />
                <span class="flex-grow px-2.5 text-center sm:px-3">
                    {{ i18n.common.create }}
                </span>
            </div>
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
        <ItemCard v-for="(item, j) in section.items" :key="j" :type :item />
    </ViewSection>
</template>
