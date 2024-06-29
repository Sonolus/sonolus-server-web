<script setup lang="ts">
import PaginationButton from '@/components/pagination/PaginationButton.vue'
import PaginationInput from '@/components/pagination/PaginationInput.vue'
import IconAngleLeft from '@/icons/IconAngleLeft.vue'
import IconAngleRight from '@/icons/IconAngleRight.vue'
import IconAnglesLeft from '@/icons/IconAnglesLeft.vue'
import IconAnglesRight from '@/icons/IconAnglesRight.vue'

defineProps<{
    count: number
}>()

const value = defineModel<number>({ required: true })
</script>

<template>
    <div class="flex justify-center">
        <PaginationButton :icon="IconAnglesLeft" :disabled="value <= 0" @click="value = 0" />
        <PaginationButton :icon="IconAngleLeft" :disabled="value <= 0" @click="value--" />
        <PaginationInput v-model="value" :page="value" :count />
        <PaginationButton
            :icon="IconAngleRight"
            :disabled="count !== -1 && value >= count - 1"
            @click="value++"
        />
        <PaginationButton
            :icon="IconAnglesRight"
            :disabled="count === -1 || value >= count - 1"
            @click="value = count - 1"
        />
    </div>
</template>
