<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import BackgroundGlow from './components/BackgroundGlow.vue'
import { useI18n } from './i18n'

const route = useRoute()
const { locale } = useI18n()
</script>

<template>
    <BackgroundGlow />

    <RouterView v-slot="{ Component }">
        <Transition
            mode="out-in"
            leave-to-class="v-transition"
            enter-from-class="v-transition"
        >
            <KeepAlive>
                <component
                    :is="Component"
                    :key="`${locale}:${route.fullPath}`"
                />
            </KeepAlive>
        </Transition>
    </RouterView>
</template>
