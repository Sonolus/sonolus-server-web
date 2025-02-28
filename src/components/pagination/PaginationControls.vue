<script setup lang="ts">
import PaginationButton from '@/components/pagination/PaginationButton.vue'
import PaginationInput from '@/components/pagination/PaginationInput.vue'
import IconAngleLeft from '@/icons/IconAngleLeft.vue'
import IconAngleRight from '@/icons/IconAngleRight.vue'
import IconAnglesLeft from '@/icons/IconAnglesLeft.vue'
import IconAnglesRight from '@/icons/IconAnglesRight.vue'
import { computed } from 'vue'

defineProps<{
    count: number
    cursor?: string
}>()

const value = defineModel<string | number>({ required: true })

const page = computed({
    get: () => (typeof value.value === 'number' ? value.value : 0),
    set: (page) => (value.value = page),
})
</script>

<template>
    <div class="flex justify-center">
        <template v-if="count < 0">
            <PaginationButton
                :icon="IconAngleRight"
                :disabled="cursor === undefined"
                @click="value = cursor ?? ''"
            />
        </template>
        <template v-else>
            <PaginationButton :icon="IconAnglesLeft" :disabled="page <= 0" @click="page = 0" />
            <PaginationButton :icon="IconAngleLeft" :disabled="page <= 0" @click="page--" />
            <PaginationInput v-model="page" :count />
            <PaginationButton
                :icon="IconAngleRight"
                :disabled="page >= count - 1"
                @click="page++"
            />
            <PaginationButton
                :icon="IconAnglesRight"
                :disabled="page >= count - 1"
                @click="page = count - 1"
            />
        </template>
    </div>
</template>
