<script setup lang="ts">
import { sonolusPost } from '@/client'
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import TextInput from '@/components/TextInput.vue'
import ViewSection from '@/components/ViewSection.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n, i18nText } from '@/i18n'
import IconAdvanced from '@/icons/IconAdvanced.vue'
import IconMore from '@/icons/IconMore.vue'
import IconPlus from '@/icons/IconPlus.vue'
import IconSearch from '@/icons/IconSearch.vue'
import { paths } from '@/utils/item'
import { viewReload, type OverlayEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerCreateItemResponse, ServerItemInfo } from '@sonolus/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

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

const props = defineProps<{
    type: ItemType
    data: ServerItemInfo
}>()

const emit = defineEmits<OverlayEmit>()

const router = useRouter()

const search = ref('')
const keywords = computed(() => search.value.trim())

const onCreate = async (result: FormResult) => {
    router.back()

    try {
        emit('overlay', {
            type: 'loading',
            getMessage: () => i18n.value.clients.customServer[props.type].create.loading,
        })

        const { shouldUpdateInfo, shouldNavigateToItem } =
            await sonolusPost<ServerCreateItemResponse>({
                url: `/${paths[props.type]}/create`,
                body: {
                    values: new URLSearchParams(result.query).toString(),
                },
            })

        if (shouldUpdateInfo) {
            viewReload.value++
        }

        if (shouldNavigateToItem) {
            void router.push({
                name: `${props.type}-details`,
                params: { name: shouldNavigateToItem },
            })
        }

        emit('overlay')
    } catch {
        emit('overlay', {
            type: 'error',
            getMessage: () =>
                i18n.value.clients.customServer[props.type].create.error(
                    import.meta.env.VITE_TITLE,
                ),
        })
    }
}
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
                v-if="data.creates?.length"
                :to="{ name: `${type}-create`, data: { creates: data.creates, onCreate } }"
                :icon="IconPlus"
            >
                {{ i18n.common.create }}
            </AppButton>
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
