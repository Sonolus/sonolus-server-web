<script setup lang="ts">
import { sonolusGet } from '@/client'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PaginationControls from '@/components/pagination/PaginationControls.vue'
import PaginationMoreButton from '@/components/pagination/PaginationMoreButton.vue'
import { i18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import LeaderboardRecord from '@/views/details/leaderboard/LeaderboardRecord.vue'
import type {
    ItemType,
    ServerItemLeaderboardDetails,
    ServerItemLeaderboardRecordList,
} from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
    leaderboardName: string
    details: ServerItemLeaderboardDetails
}>()

const show = ref(false)
const param = ref<string | number>(0)

const isLoading = ref(true)
const list = ref<ServerItemLeaderboardRecordList>()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
    if (!show.value) return

    try {
        isLoading.value = true
        list.value = undefined

        list.value = await sonolusGet({
            url: `/${paths[props.type]}/${props.name}/leaderboards/${props.leaderboardName}/records/list`,
            query:
                typeof param.value === 'string'
                    ? { cursor: param.value }
                    : { page: `${param.value}` },
        })
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
                {{ i18n.clients.customServer[type].leaderboard.record.list.loading }}
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
            <PaginationControls v-model="param" :count="list.pageCount" :cursor="list.cursor" />
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
