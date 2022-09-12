<script setup lang="ts">
import { ref } from 'vue'
import HomeIcon from '../assets/home.svg'
import LanguageIcon from '../assets/language.svg?component'
import LocalizationIcon from '../assets/localization.svg'
import { useI18n } from '../i18n'
import MyButton from './MyButton.vue'

defineProps<{
    title: string
}>()

const showSelect = ref(false)
const openSelect = () => (showSelect.value = true)
const closeSelect = () => (showSelect.value = false)

const { locales, locale } = useI18n()
const select = (name: string) => {
    locale.value = name
    closeSelect()
}
</script>

<template>
    <nav class="z-10 flex items-center bg-sonolus-ui-surface">
        <RouterLink
            :to="{ name: 'home' }"
            class="cursor-pointer select-none p-2 transition-colors hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3"
        >
            <HomeIcon
                class="h-7 w-7 flex-shrink-0 fill-current sm:h-10 sm:w-10"
            />
        </RouterLink>
        <div
            class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center text-xl font-bold sm:px-3 sm:text-3xl"
        >
            {{ title }}
        </div>
        <button
            class="cursor-pointer select-none p-2 transition-colors hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3"
            @click="openSelect"
        >
            <LocalizationIcon
                class="h-7 w-7 flex-shrink-0 fill-current sm:h-10 sm:w-10"
            />
        </button>

        <Transition
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity"
            leave-to-class="opacity-0"
            leave-active-class="transition-opacity"
        >
            <ul
                v-if="showSelect"
                class="fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] select-none flex-col items-center justify-center bg-sonolus-main bg-opacity-90"
                @click.self="closeSelect"
            >
                <li
                    class="w-full max-w-md p-1 sm:p-1.5"
                    v-for="meta in locales"
                    :key="meta.name"
                >
                    <MyButton
                        class="w-full"
                        :icon="LanguageIcon"
                        @click="select(meta.name)"
                    >
                        {{ meta.title }}
                    </MyButton>
                </li>
            </ul>
        </Transition>
    </nav>
</template>
