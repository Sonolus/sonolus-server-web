<script lang="ts">
let viewData: { routeId: unknown; data: unknown } | undefined

export const setViewData = (routeId: unknown, data: unknown) => (viewData = { routeId, data })
</script>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import NavBar from '@/components/NavBar.vue'
import SelectLocalization from '@/components/SelectLocalization.vue'
import ViewBanner from '@/components/ViewBanner.vue'
import { useI18n, type I18n } from '@/i18n'
import IconError from '@/icons/IconError.vue'
import { computed, ref, type Component } from 'vue'

const props = defineProps<{
    routeId: unknown
    url?: (props: unknown) => string
    loading?: (context: { i18n: I18n; props: unknown }) => string
    error?: (context: { i18n: I18n; props: unknown }) => string
    title?: (context: { i18n: I18n; props: unknown }) => string
    banner?: (props: unknown) => string | undefined
    component: Component
    componentProps: {
        query: Record<string, string>
    }
}>()

const { locale, i18n } = useI18n()

const state = ref<boolean>()
const data = ref()

if (viewData && viewData.routeId === props.routeId) {
    state.value = true
    data.value = viewData.data
}

const loading = computed(() => props.loading?.({ i18n: i18n.value, props: props.componentProps }))
const error = computed(() => props.error?.({ i18n: i18n.value, props: props.componentProps }))

const title = computed(() =>
    props.title?.({
        i18n: i18n.value,
        props: { ...props.componentProps, data: data.value },
    }),
)

const banner = computed(() => props.banner?.({ ...props.componentProps, data: data.value }))

;(async () => {
    if (!props.url) {
        state.value = false
        return
    }

    try {
        const searchParams = new URLSearchParams(props.componentProps.query)
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus${props.url(props.componentProps)}?${searchParams}`,
        )
        data.value = await response.json()
        state.value = true
    } catch {
        state.value = false
    }
})()

const showSelectLocalization = ref(false)
</script>

<template>
    <div class="transition-opacity">
        <NavBar
            v-model="showSelectLocalization"
            class="transition-transform v-transition:-translate-y-full"
            :title
        />

        <SelectLocalization v-model="showSelectLocalization" />

        <main
            class="mx-auto max-w-3xl p-30 transition-opacity v-transition:opacity-0 sm:p-36"
            :inert="showSelectLocalization"
        >
            <Transition
                mode="out-in"
                enter-from-class="opacity-0"
                enter-active-class="transition-opacity"
                leave-to-class="opacity-0"
                leave-active-class="transition-opacity"
            >
                <div v-if="state">
                    <ViewBanner :banner />
                    <div class="flex flex-col gap-30 sm:gap-36">
                        <component :is="component" v-bind="componentProps" :data />
                    </div>
                </div>
                <div
                    v-else
                    :key="`${state}`"
                    class="flex min-h-[calc(100vh-110px)] flex-col items-center justify-center sm:min-h-[calc(100vh-132px)]"
                >
                    <template v-if="state === undefined">
                        <LoadingSpinner />
                        <span class="mt-10 whitespace-break-spaces text-center sm:mt-12">{{
                            loading
                        }}</span>
                    </template>
                    <template v-else>
                        <IconError class="size-30 fill-current sm:size-36" />
                        <span class="mt-10 whitespace-break-spaces text-center sm:mt-12">{{
                            error
                        }}</span>
                    </template>
                </div>
            </Transition>
        </main>
    </div>
</template>
