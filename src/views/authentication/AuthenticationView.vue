<script setup lang="ts">
import { auth, createAuthAttempt } from '@/auth'
import { sonolusPost } from '@/client'
import OpenInSonolus from '@/components/OpenInSonolus.vue'
import { i18n } from '@/i18n'
import IconLogout from '@/icons/IconLogout.vue'
import IconRedo from '@/icons/IconRedo.vue'
import { viewOptions } from '@/views/viewOptions'
import { onDeactivated, onUnmounted, ref, watch } from 'vue'

defineOptions(
    viewOptions({
        url: () => undefined,
    }),
)

const attempt = ref<{
    key: string
    url: string
}>()

const onLogout = () => {
    auth.value = null
}

const onRetry = async () => {
    attempt.value = await createAuthAttempt()
}

watch(
    [auth, attempt],
    () => {
        if (auth.value) return
        if (attempt.value) return

        void onRetry()
    },
    { immediate: true },
)

const count = ref(0)
const stop = ref(false)

watch(attempt, () => {
    count.value = 60
})

onDeactivated(() => {
    count.value = 0
})

onUnmounted(() => {
    stop.value = true
})

void (async () => {
    while (!stop.value) {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (!attempt.value) continue
        if (count.value <= 0) continue

        try {
            auth.value = await sonolusPost({
                url: '/web/authenticate',
                body: {
                    key: attempt.value.key,
                },
            })
            attempt.value = undefined
        } catch {
            count.value--
        }
    }
})()
</script>

<template>
    <div
        class="flex min-h-[calc(100vh-110px)] flex-col items-center justify-center gap-30 sm:min-h-[calc(100vh-132px)] sm:gap-36"
    >
        <template v-if="auth">
            <div>{{ i18n.loggedIn }}{{ auth.title }}</div>
            <button
                class="flex min-w-120 items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:gap-6 sm:p-6"
                @click="onLogout"
            >
                <IconLogout class="size-20 flex-shrink-0 fill-current sm:size-24" />
                <span class="flex-grow px-2.5 text-center sm:px-3">
                    {{ i18n.routes.server.home.logout }}
                </span>
            </button>
        </template>
        <template v-else-if="attempt">
            <template v-if="count > 0">
                <div>{{ i18n.logIn }}</div>
                <OpenInSonolus :url="attempt.url" />
            </template>
            <template v-else>
                <div>{{ i18n.logInTimedOut }}</div>
                <button
                    class="flex min-w-120 items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:gap-6 sm:p-6"
                    @click="onRetry"
                >
                    <IconRedo class="size-20 flex-shrink-0 fill-current sm:size-24" />
                    <span class="flex-grow px-2.5 text-center sm:px-3">{{ i18n.logInRetry }}</span>
                </button>
            </template>
        </template>
    </div>
</template>
