<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    text: string
}>()

const segments = computed(() =>
    props.text.split(
        /((?:http|https):\/\/(?:[A-Za-z0-9-._~:\\/?#[\]@!$&'()*+,;%=]+[A-Za-z0-9-_~\\/#[\]@$&'()*+%=]))/,
    ),
)
</script>

<template>
    <p class="wrap-anywhere whitespace-break-spaces">
        <template v-for="(segment, index) in segments" :key="index">
            <a
                v-if="index % 2"
                class="underline"
                :href="segment"
                target="_blank"
                rel="noreferrer nofollow"
            >
                {{ segment }}
            </a>
            <span v-else>{{ segment }}</span>
        </template>
    </p>
</template>
