<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useJump } from '../composables/jump'
import { useI18n } from '../i18n'
import JumpView from '../views/JumpView.vue'
import BaseRoute from './BaseRoute.vue'

const route = useRoute()
const router = useRouter()

const states = useJump()
const state = states[+route.params.index]
if (!state) {
    router.replace({ name: 'home' })
}

const { i18n } = useI18n()
</script>

<template>
    <BaseRoute :fallback="state" :title="i18n.routes.jumpToPage.title">
        <template #loaded="{ data }">
            <JumpView :state="data" />
        </template>
    </BaseRoute>
</template>
