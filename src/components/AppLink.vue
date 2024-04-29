<script lang="ts">
export type AppLinkProps = {
    to: RouteLocationNamedRaw & { data?: unknown }
}

let id = 0
</script>

<script setup lang="ts">
import { setViewData } from '@/views/BaseView.vue'
import { useLink, useRouter, type RouteLocationNamedRaw } from 'vue-router'

const props = defineProps<AppLinkProps>()

const { href } = useLink(props)
const router = useRouter()

const onClick = () => {
    const routeId = ++id

    if (props.to.data !== undefined) {
        setViewData(routeId, props.to.data)
    }

    router.push({
        ...props.to,
        force: true,
        state: {
            routeId,
        },
    })
}
</script>

<template>
    <a :href tabindex="0" @click.prevent="onClick">
        <slot />
    </a>
</template>
