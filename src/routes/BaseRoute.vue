<script setup lang="ts">
import {
    onActivated,
    onDeactivated,
    onMounted,
    ref,
    watch,
    watchEffect,
} from 'vue'
import { baseUrl } from '../api'
import ErrorCircleIcon from '../assets/error-circle.svg'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import NavBar from '../components/NavBar.vue'
import { useI18n } from '../i18n'

const props = defineProps<{
    url?: string
    fallback?: unknown
    title?: string
}>()

const emit = defineEmits<{
    (e: 'update', data: any): void
}>()

const { locale, i18n } = useI18n()

const data = ref()
const isLoading = ref(true)

const loadData = () => {
    if (!props.url) {
        isLoading.value = false
        data.value = props.fallback
        return
    }

    const url = new URL(baseUrl + props.url, window.location.origin)
    url.searchParams.append('localization', locale.value)

    isLoading.value = true
    fetch(url)
        .then((response) => response.json())
        .then((value) => (data.value = value))
        .finally(() => (isLoading.value = false))
}

onMounted(loadData)
onActivated(() => {
    if (isLoading.value) return
    if (data.value) return

    loadData()
})
watch(data, () => emit('update', data.value))

const appTitle = import.meta.env.VITE_TITLE
const isActive = ref(false)
onActivated(() => (isActive.value = true))
onDeactivated(() => (isActive.value = false))
watchEffect(() => {
    if (!isActive.value) return

    document.title =
        props.title === undefined ? appTitle : `${props.title} | ${appTitle}`
})
</script>

<template>
    <div class="duration-150">
        <NavBar
            class="fixed top-0 w-full transition-transform v-transition:-translate-y-full"
            :title="title === undefined ? appTitle : title"
        />

        <div class="h-11 sm:h-16" />

        <Transition
            mode="out-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isLoading"
                class="mx-auto flex h-[calc(100vh-44px)] max-w-4xl flex-col items-center justify-center p-9 text-center transition-opacity v-transition:opacity-0 sm:h-[calc(100vh-64px)] sm:p-12"
            >
                <LoadingSpinner class="h-12 w-12 sm:h-16 sm:w-16" />
                <div class="mt-2 sm:mt-3">
                    <slot name="loading">
                        {{ i18n.common.loading }}
                    </slot>
                </div>
            </div>

            <div
                v-else-if="!data"
                class="mx-auto flex h-[calc(100vh-44px)] max-w-4xl flex-col items-center justify-center p-9 text-center transition-opacity v-transition:opacity-0 sm:h-[calc(100vh-64px)] sm:p-12"
            >
                <ErrorCircleIcon
                    class="h-12 w-12 fill-current p-3 sm:h-16 sm:w-16 sm:p-4"
                />
                <div class="mt-2 whitespace-pre-wrap sm:mt-3">
                    <slot name="error" />
                </div>
            </div>

            <main
                v-else
                class="mx-auto flex max-w-4xl flex-col space-y-9 p-9 transition-opacity v-transition:opacity-0 sm:space-y-12 sm:p-12"
            >
                <slot name="loaded" :data="data" />
            </main>
        </Transition>
    </div>
</template>
