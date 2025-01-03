<script lang="ts">
let id = 0
</script>

<script setup lang="ts">
import type { AppLinkProps } from '@/components/AppLink'
import { setViewData } from '@/views/BaseView'
import { useLink, useRouter } from 'vue-router'

const props = defineProps<AppLinkProps>()

const { href } = useLink(props)
const router = useRouter()

const onClick = () => {
    const routeId = ++id

    if (props.to.data !== undefined) {
        setViewData(routeId, props.to.data)
    }

    void router.push({
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
