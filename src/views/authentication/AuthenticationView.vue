<script setup lang="ts">
import { auth, createAuthAttempt } from '@/auth'
import { sonolusPost } from '@/client'
import AppButton from '@/components/AppButton.vue'
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
            <AppButton :icon="IconLogout" @click="onLogout">
                {{ i18n.routes.server.home.logout }}
            </AppButton>
        </template>
        <template v-else-if="attempt">
            <template v-if="count > 0">
                <div>{{ i18n.logIn }}</div>
                <OpenInSonolus :url="attempt.url" />
            </template>
            <template v-else>
                <div>{{ i18n.logInTimedOut }}</div>
                <AppButton :icon="IconRedo" @click="onRetry">
                    {{ i18n.logInRetry }}
                </AppButton>
            </template>
        </template>
    </div>
</template>
