<script setup lang="ts">
import { sonolusGet } from '@/client'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import NavBar from '@/components/NavBar.vue'
import ViewBanner from '@/components/ViewBanner.vue'
import { i18n, type I18n } from '@/i18n'
import IconError from '@/icons/IconError.vue'
import { viewData, type OverlayState } from '@/views/BaseView'
import { computed, ref, type Component } from 'vue'

const props = defineProps<{
    routeId: unknown
    url?: (props: unknown) => string | undefined
    loading?: (context: { i18n: I18n; props: unknown }) => string
    error?: (context: { i18n: I18n; props: unknown }) => string
    title?: (context: { i18n: I18n; props: unknown }) => string
    banner?: (props: unknown) => string | undefined
    component: Component
    componentProps: {
        query: Record<string, string>
    }
}>()

const state = ref<boolean>()
const data = ref<unknown>()

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

const overlayState = ref<OverlayState>()

void (async () => {
    if (state.value) return

    if (!props.url) {
        state.value = false
        return
    }

    try {
        const url = props.url(props.componentProps)

        if (url) {
            data.value = await sonolusGet({
                url,
                query: props.componentProps.query,
            })
        }

        state.value = true
    } catch {
        state.value = false
    }
})()
</script>

<template>
    <div class="transition-opacity">
        <NavBar class="transition-transform v-transition:-translate-y-full" :title />

        <Transition
            mode="out-in"
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity"
            leave-to-class="opacity-0"
            leave-active-class="transition-opacity"
        >
            <div
                v-if="overlayState"
                class="fixed left-0 top-0 z-20 flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-10 bg-overlay-main p-30 sm:gap-12 sm:p-36"
            >
                <LoadingSpinner v-if="overlayState.type === 'loading'" />
                <IconError v-else class="size-30 fill-current sm:size-36" />
                <span class="whitespace-break-spaces text-center">
                    {{ overlayState.getMessage() }}
                </span>
            </div>
        </Transition>

        <main class="mx-auto max-w-3xl p-30 transition-opacity v-transition:opacity-0 sm:p-36">
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
                        <component
                            :is="component"
                            v-bind="componentProps"
                            :data
                            @overlay="overlayState = $event"
                        />
                    </div>
                </div>
                <div
                    v-else
                    :key="`${state}`"
                    class="flex min-h-[calc(100vh-110px)] flex-col items-center justify-center gap-10 sm:min-h-[calc(100vh-132px)] sm:gap-12"
                >
                    <template v-if="state === undefined">
                        <LoadingSpinner />
                        <span class="whitespace-break-spaces text-center">{{ loading }}</span>
                    </template>
                    <template v-else>
                        <IconError class="size-30 fill-current sm:size-36" />
                        <span class="whitespace-break-spaces text-center">{{ error }}</span>
                    </template>
                </div>
            </Transition>
        </main>
    </div>
</template>
