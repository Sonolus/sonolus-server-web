<script setup lang="ts">
import type { ItemList } from 'sonolus-core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AngleLeftIcon from '../../assets/angle-left.svg?component'
import AngleRightIcon from '../../assets/angle-right.svg?component'
import AnglesLeftIcon from '../../assets/angles-left.svg?component'
import AnglesRightIcon from '../../assets/angles-right.svg?component'
import XMarkIcon from '../../assets/x-mark.svg?component'
import MyButton from '../../components/MyButton.vue'
import OpenInSonolus from '../../components/OpenInSonolus.vue'
import SearchButton from '../../components/SearchButton.vue'
import { useJump } from '../../composables/jump'
import { useListRoute } from '../../composables/list-route'
import { useI18n } from '../../i18n'

const props = defineProps<{
    type: string
    data: ItemList<any>
}>()

const { i18n } = useI18n()

const route = useRoute()
const { search, page } = useListRoute()

const router = useRouter()
const states = useJump()
const onJump = () => {
    states.push({
        name: route.name!,
        query: route.query,
        page: page.value,
        pageCount: props.data.pageCount,
    })
    router.push({ name: 'jump', params: { index: states.length - 1 } })
}

const text = computed(() => {
    const texts: Record<string, string> = {}

    props.data.search.options.forEach((option) => {
        if (!route.query[option.query]) return

        const name = i18n.value.getName(option.name)
        const value = `${route.query[option.query]}`

        switch (option.type) {
            case 'text': {
                if (!value) return

                texts[option.query] = `${name}: ${value}`
                break
            }

            case 'slider': {
                const val = parseFloat(value)
                if (isNaN(val)) return
                if (val == option.def) return

                texts[option.query] = `${name}: ${val}`
                break
            }

            case 'toggle': {
                const val = value !== '0'
                if (val === (option.def !== 0)) return

                texts[option.query] = `${name}: ${
                    val ? i18n.value.common.on : i18n.value.common.off
                }`
                break
            }

            case 'select': {
                const val = parseInt(value)
                if (isNaN(val)) return
                if (val == option.def) return

                texts[option.query] = `${name}: ${i18n.value.getValue(
                    option.values[val]
                )}`
                break
            }
        }
    })

    return Object.values(texts).join(', ')
})
</script>

<template>
    <div class="flex flex-col space-y-2 sm:space-y-3">
        <template v-for="(item, index) in data.items" :key="index">
            <slot name="list" :item="item" />
        </template>
    </div>

    <MyButton
        v-if="text"
        class="fixed top-2 left-0 w-full sm:top-4"
        :to="{ name: route.name! }"
        :icon="XMarkIcon"
    >
        {{ text }}
    </MyButton>

    <div class="fixed left-0 bottom-0 flex w-full justify-center">
        <OpenInSonolus
            class="mr-2 sm:mr-3"
            :deep-link="`/${type}/list${search}`"
            no-text
        />

        <MyButton
            :to="{
                name: route.name!,
                query: { ...route.query, page: undefined },
            }"
            :icon="AnglesLeftIcon"
            :disabled="page <= 0"
        />
        <MyButton
            :to="{
                name: route.name!,
                query: { ...route.query, page: page - 1 || undefined },
            }"
            :icon="AngleLeftIcon"
            :disabled="page <= 0"
        />
        <MyButton
            :to="{
                name: route.name!,
                query: route.query,
            }"
            @click="onJump"
        >
            {{ page + 1 }}
            <template v-if="data.pageCount != -1">
                / {{ data.pageCount }}
            </template>
        </MyButton>
        <MyButton
            :to="{
                name: route.name!,
                query: { ...route.query, page: page + 1 },
            }"
            :icon="AngleRightIcon"
            :disabled="data.pageCount == -1 || page >= data.pageCount - 1"
        />
        <MyButton
            :to="{
                name: route.name!,
                query: { ...route.query, page: data.pageCount - 1 },
            }"
            :icon="AnglesRightIcon"
            :disabled="data.pageCount == -1 || page >= data.pageCount - 1"
        />

        <SearchButton
            class="ml-2 sm:ml-3"
            :name="route.name!"
            :search="data.search"
            :query="route.query"
            no-text
        />
    </div>
</template>
