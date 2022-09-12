<script setup lang="ts">
import type { ServerInfo } from 'sonolus-core'
import { ref } from 'vue'
import { toUrl } from '../api'
import MoreIcon from '../assets/more.svg?component'
import BackgroundCard from '../components/cards/BackgroundCard.vue'
import EffectCard from '../components/cards/EffectCard.vue'
import EngineCard from '../components/cards/EngineCard.vue'
import LevelCard from '../components/cards/LevelCard.vue'
import ParticleCard from '../components/cards/ParticleCard.vue'
import SkinCard from '../components/cards/SkinCard.vue'
import MyButton from '../components/MyButton.vue'
import OpenInSonolus from '../components/OpenInSonolus.vue'
import SearchButton from '../components/SearchButton.vue'
import { useI18n } from '../i18n'

defineProps<{
    data: ServerInfo
}>()

const { i18n } = useI18n()

const sections = {
    levels: ['level-list', LevelCard],
    skins: ['skin-list', SkinCard],
    backgrounds: ['background-list', BackgroundCard],
    effects: ['effect-list', EffectCard],
    particles: ['particle-list', ParticleCard],
    engines: ['engine-list', EngineCard],
} as const

const isError = ref(false)
</script>

<template>
    <h1
        class="overflow-hidden text-ellipsis whitespace-nowrap py-1 text-center text-xl font-bold sm:py-1.5 sm:text-3xl"
    >
        {{ data.title }}
    </h1>

    <div class="flex justify-center">
        <OpenInSonolus deep-link="" />
    </div>

    <template v-for="([routeName, card], name) in sections" :key="name">
        <div class="flex flex-col space-y-2 sm:space-y-3">
            <div class="flex space-x-2 sm:space-x-3">
                <h2
                    class="flex-grow py-1 text-xl font-bold sm:py-1.5 sm:text-3xl"
                >
                    {{ i18n.routes.server.home[name] }}
                </h2>
                <SearchButton
                    :name="routeName"
                    :search="data[name].search"
                    :query="{}"
                    no-text
                />
                <MyButton :to="{ name: routeName }" :icon="MoreIcon" />
            </div>

            <template v-for="item in data[name].items" :key="item.name">
                <component :is="card" :="{ item }" />
            </template>

            <div class="flex justify-center space-x-2 sm:space-x-3">
                <SearchButton
                    :name="routeName"
                    :search="data[name].search"
                    :query="{}"
                />
                <MyButton :to="{ name: routeName }" :icon="MoreIcon">
                    {{ i18n.common.more }}
                </MyButton>
            </div>
        </div>
    </template>

    <div
        v-if="!isError"
        class="fixed top-2 left-0 -z-10 flex w-full justify-center sm:top-4"
    >
        <img
            class="pointer-events-none h-[11.25rem] object-cover opacity-40 sm:h-60"
            :src="toUrl(data.banner)"
            alt="Banner"
            @error="isError = true"
        />
    </div>
</template>
