<script setup lang="ts">
import BackgroundGlow from '@/components/BackgroundGlow.vue'
import { locale } from '@/i18n'
import { viewReload } from '@/views/BaseView'

const getRouteId = () => (history.state as { routeId: string }).routeId
</script>

<template>
    <BackgroundGlow />

    <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in" leave-to-class="v-transition" enter-from-class="v-transition">
            <KeepAlive>
                <component
                    :is="Component"
                    :key="`${viewReload}:${getRouteId()}:${locale}:${route.fullPath}`"
                    :route-id="getRouteId()"
                />
            </KeepAlive>
        </Transition>
    </RouterView>
</template>
