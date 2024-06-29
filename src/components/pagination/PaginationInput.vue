<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
    count: number
}>()

const value = defineModel<number>({ required: true })

const enabled = computed(() => props.count === -1 || props.count > 1)

const inputValue = ref(value.value + 1)

const onSubmit = () => {
    const page = inputValue.value - 1
    if (page < 0) return
    if (props.count !== -1 && page > props.count - 1) return

    value.value = page
}
</script>

<template>
    <div
        class="flex w-120 items-center transition-colors focus-within:outline focus-within:outline-offset-0 sm:w-144"
        :class="
            enabled
                ? 'bg-button-normal hover:bg-button-highlighted active:bg-button-pressed'
                : 'bg-button-disabled text-text-disabled'
        "
        :inert="!enabled"
    >
        <input
            v-model="inputValue"
            type="number"
            class="size-full flex-grow border-none bg-[transparent] p-5 text-right focus-visible:ring-0 sm:p-6"
            :min="1"
            :max="count === -1 ? undefined : count"
            @keypress.enter="onSubmit"
        />
        <span v-if="count !== -1" class="mr-7.5 flex-shrink-0 sm:mr-9">/ {{ count }}</span>
    </div>
</template>
