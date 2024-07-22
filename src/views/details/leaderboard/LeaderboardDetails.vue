<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationControls from '@/components/pagination/PaginationControls.vue'
import PaginationMoreButton from '@/components/pagination/PaginationMoreButton.vue'
import { useI18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import type { ItemPathType } from '@/utils/item'
import { pathToTypes } from '@/utils/type'
import LeaderboardRecord from '@/views/details/leaderboard/LeaderboardRecord.vue'
import type { ServerItemLeaderboardDetails, ServerItemLeaderboardRecordList } from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemPathType
    name: string
    leaderboardName: string
    details: ServerItemLeaderboardDetails
}>()

const { locale, i18n } = useI18n()

const show = ref(false)
const page = ref(0)

const isLoading = ref(true)
const list = ref<ServerItemLeaderboardRecordList>()

watchEffect(async () => {
    if (!show.value) return

    try {
        isLoading.value = true
        list.value = undefined

        const searchParams = new URLSearchParams()
        searchParams.append('page', `${page.value}`)
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${props.type}/${props.name}/leaderboards/${props.leaderboardName}/records/list?${searchParams}`,
        )
        list.value = await response.json()
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <Transition
        mode="out-in"
        enter-from-class="opacity-0"
        enter-active-class="transition-opacity"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity"
    >
        <div v-if="show && isLoading" class="flex flex-col items-center gap-10 sm:gap-12">
            <LoadingSpinner />
            <span class="whitespace-break-spaces text-center">
                {{ i18n.clients.customServer[pathToTypes[type]].leaderboard.record.list.loading }}
            </span>
        </div>

        <div v-else-if="show && list" class="flex flex-col gap-10 sm:gap-12">
            <LeaderboardRecord
                v-for="record in list.records"
                :key="record.name"
                :type
                :name
                :leaderboard-name
                :record
            />
            <PaginationControls v-model="page" :count="list.pageCount" />
        </div>

        <div v-else-if="show" class="flex justify-center">
            <IconXMark class="size-50 fill-text-disabled sm:size-60" />
        </div>

        <div v-else-if="details.topRecords.length" class="flex flex-col gap-10 sm:gap-12">
            <LeaderboardRecord
                v-for="record in details.topRecords"
                :key="record.name"
                :type
                :name
                :leaderboard-name
                :record
            />
            <div class="flex justify-center">
                <PaginationMoreButton @click="show = true" />
            </div>
        </div>

        <div
            v-else
            class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
        >
            {{ i18n.routes.server.details.leaderboard.noRecords }}
        </div>
    </Transition>
</template>
