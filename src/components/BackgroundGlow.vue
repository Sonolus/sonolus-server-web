<script setup lang="ts">
import { computed, ref } from 'vue'

const items = ref<
    {
        id: number
        x: number
        y: number
        duration: number
        value: number
        endTime: number
    }[]
>([])

const width = ref(document.documentElement.clientWidth)
const height = ref(document.documentElement.clientHeight)

const size = computed(() => Math.min(width.value, height.value) * 0.125)
const xCount = computed(() => Math.ceil(width.value / size.value / 2 - 0.5))
const yCount = computed(() => Math.ceil(height.value / size.value / 2 - 0.5))

let nonce = 0
setInterval(() => {
    width.value = document.documentElement.clientWidth
    height.value = document.documentElement.clientHeight

    const time = Date.now()
    items.value = items.value.filter((item) => item.endTime > time)

    const x = Math.floor(Math.random() * (2 * xCount.value + 1) - xCount.value)
    const y = Math.floor(Math.random() * (2 * yCount.value + 1) - yCount.value)
    if (items.value.some((item) => item.x === x && item.y === y)) return

    const duration = (0.5 + Math.random()) * 2
    const value = Math.random() * 0.25

    items.value.push({
        id: nonce++,
        x,
        y,
        duration,
        value,
        endTime: time + duration * 1000,
    })
}, 100)
</script>

<template>
    <div class="-z-20" inert>
        <div
            v-for="{ id, x, y, duration, value } in items"
            :key="id"
            class="glow fixed bg-glow"
            :style="{
                left: `${width / 2 + (x - 0.5) * size}px`,
                top: `${height / 2 + (y - 0.5) * size}px`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                '--scale': 0.75 + value,
                '--brightness': value,
            }"
        />
    </div>
</template>

<style scoped>
.glow {
    animation-name: glow;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
}

@keyframes glow {
    0% {
        transform: scale(0.75);
        opacity: 0;
    }

    50% {
        transform: scale(var(--scale));
        opacity: var(--brightness);
    }

    100% {
        transform: scale(0.75);
        opacity: 0;
    }
}
</style>
