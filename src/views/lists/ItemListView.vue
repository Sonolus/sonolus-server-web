<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n, i18nText } from '@/i18n'
import IconAngleLeft from '@/icons/IconAngleLeft.vue'
import IconAngleRight from '@/icons/IconAngleRight.vue'
import IconAnglesLeft from '@/icons/IconAnglesLeft.vue'
import IconAnglesRight from '@/icons/IconAnglesRight.vue'
import IconSearch from '@/icons/IconSearch.vue'
import IconXMark from '@/icons/IconXMark.vue'
import { paths, type Item } from '@/utils/item'
import { viewOptions } from '@/views/viewOptions'
import type { ItemType, ServerItemList } from '@sonolus/core'
import { computed } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${paths[type]}/list`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].list.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[type].list.error(import.meta.env.VITE_TITLE),

        title: ({ i18n, props: { type } }) => i18n.routes.server.lists[type].title,
    }),
)

const props = defineProps<{
    type: ItemType
    query: Record<string, string>
    data: ServerItemList<Item>
}>()

const text = computed(() => {
    if (!props.data.searches) return

    const type = props.query.type
    if (!type) return

    if (type === 'quick') {
        const keywords = props.query.keywords
        if (!keywords) return

        return i18n.value.routes.server.lists.searchOption(i18n.value.texts['#KEYWORDS'], keywords)
    }

    const search = props.data.searches.find((search) => search.type === type)
    if (!search) return

    const texts: Record<string, string> = {
        type: i18nText(search.title),
    }

    for (const option of search.options) {
        const value = props.query[option.query]
        if (!value) continue

        const add = (value: string) =>
            (texts[option.query] = i18n.value.routes.server.lists.searchOption(
                i18nText(option.name),
                value,
            ))

        switch (option.type) {
            case 'text':
            case 'textArea':
                if (value === option.def) continue

                add(value)
                break

            case 'slider': {
                const val = +value
                if (val === option.def) continue

                add(`${val}`)
                break
            }

            case 'toggle': {
                const val = value !== '0'
                if (val === !!option.def) continue

                add(val ? i18n.value.common.on : i18n.value.common.off)
                break
            }

            case 'select': {
                if (value === option.def) continue

                add(i18nText(option.values.find(({ name }) => name === value)?.title ?? ''))
                break
            }

            case 'multi': {
                const val = new Set(
                    value
                        .split(',')
                        .filter((name) => option.values.some((value) => value.name === name)),
                )
                if (
                    val.size === option.def.length &&
                    option.def.every(
                        (value, index) => !value || val.has(option.values[index]?.name ?? ''),
                    )
                )
                    continue

                add(
                    option.values.length && val.size === option.values.length
                        ? i18n.value.common.multiField.allSelected
                        : i18n.value.common.multiField.selected(`${val.size}`),
                )
                break
            }

            case 'serverItem':
            case 'serverItems':
            case 'collectionItem':
            case 'file':
                add('')
                break
        }
    }

    return Object.values(texts).join(i18n.value.common.separator)
})

const page = computed(() => +(props.query.page ?? '') || 0)
</script>

<template>
    <AppButton
        v-if="text"
        class="fixed left-0 top-50 z-10 flex w-full justify-center sm:top-60"
        :to="{ name: `${type}-list` }"
        :icon="IconXMark"
    >
        {{ text }}
    </AppButton>

    <div class="mb-30 flex flex-col gap-10 sm:mb-36 sm:gap-12" :class="{ 'mt-30 sm:mt-36': text }">
        <ItemCard v-for="(item, key) in data.items" :key :type :item />
    </div>

    <div class="fixed bottom-0 left-0 z-10 flex w-full justify-center">
        <OpenInSonolus class="mr-30 sm:mr-36" no-text />

        <template v-if="data.pageCount < 0">
            <AppButton
                :to="{
                    name: `${type}-list`,
                    query: { ...query, page: undefined, cursor: data.cursor },
                }"
                :icon="IconAngleRight"
                :disabled="data.cursor === undefined"
            />
        </template>
        <template v-else>
            <AppButton
                :to="{ name: `${type}-list`, query: { ...query, page: 0 } }"
                :icon="IconAnglesLeft"
                :disabled="page <= 0"
            />
            <AppButton
                :to="{ name: `${type}-list`, query: { ...query, page: page - 1 } }"
                :icon="IconAngleLeft"
                :disabled="page <= 0"
            />
            <AppButton :to="{ name: `${type}-jump`, query, data }">
                {{ page + 1 }} / {{ Math.max(1, data.pageCount) }}
            </AppButton>
            <AppButton
                :to="{ name: `${type}-list`, query: { ...query, page: page + 1 } }"
                :icon="IconAngleRight"
                :disabled="page >= data.pageCount - 1"
            />
            <AppButton
                :to="{ name: `${type}-list`, query: { ...query, page: data.pageCount - 1 } }"
                :icon="IconAnglesRight"
                :disabled="page >= data.pageCount - 1"
            />
        </template>

        <AppButton
            class="ml-30 sm:ml-36"
            :to="{ name: `${type}-search`, query: { ...query, page: undefined }, data }"
            :icon="IconSearch"
        />
    </div>
</template>
