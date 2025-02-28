<script setup lang="ts">
import { pushRoute, type AppLinkProps } from '@/components/AppLink'
import { useLink } from 'vue-router'

const props = defineProps<AppLinkProps>()

const { href } = useLink(props)
</script>

<template>
    <a :href tabindex="0" @click.prevent="pushRoute(to)">
        <slot />
    </a>
</template>
