<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import IconAngleLeft from '@/icons/IconAngleLeft.vue'
import IconHome from '@/icons/IconHome.vue'
import { computed, onActivated, onDeactivated, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    title: string | undefined
}>()

const router = useRouter()

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const navBarTitle = computed(() => props.title || import.meta.env.VITE_TITLE)

const documentTitle = computed(() =>
    props.title ? `${props.title} | ${import.meta.env.VITE_TITLE}` : import.meta.env.VITE_TITLE,
)

const isActivated = ref(false)
onActivated(() => (isActivated.value = true))
onDeactivated(() => (isActivated.value = false))

watchEffect(() => {
    if (!isActivated.value) return

    document.title = documentTitle.value
})

const onBack = () => {
    router.back()
}
</script>

<template>
    <nav class="sticky top-0 z-30 flex items-center bg-surface">
        <AppLink
            class="flex-shrink-0 p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:p-12"
            :to="{ name: 'home' }"
        >
            <IconHome class="size-30 fill-current sm:size-36" />
        </AppLink>

        <div
            class="m-10 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-center text-30 font-bold sm:m-12 sm:text-36"
        >
            {{ navBarTitle }}
        </div>

        <button
            class="flex-shrink-0 p-10 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:p-12"
            type="button"
            @click="onBack"
        >
            <IconAngleLeft class="size-30 fill-current sm:size-36" />
        </button>
    </nav>
</template>
