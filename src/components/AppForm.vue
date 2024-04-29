<script setup lang="ts">
import { ref } from 'vue'

const form = ref<HTMLElement | null>(null)

const onSubmit = () => {
    if (!form.value) return

    const submit = form.value.querySelector('[data-submit]')
    if (!(submit instanceof HTMLElement)) return

    if (submit.inert) return

    submit.click()
}
</script>

<template>
    <form ref="form" @submit.prevent="onSubmit">
        <slot />
    </form>
</template>
