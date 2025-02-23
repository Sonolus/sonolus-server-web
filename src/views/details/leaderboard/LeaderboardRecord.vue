<script setup lang="ts">
import { sonolusGet } from '@/client'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ItemCard from '@/components/cards/ItemCard.vue'
import { i18n, i18nText } from '@/i18n'
import IconAngleDown from '@/icons/IconAngleDown.vue'
import IconAngleUp from '@/icons/IconAngleUp.vue'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import type {
    ItemType,
    ServerItemLeaderboardRecord,
    ServerItemLeaderboardRecordDetails,
} from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
    leaderboardName: string
    record: ServerItemLeaderboardRecord
}>()

const isExpanded = ref(false)

const isLoading = ref(true)
const details = ref<ServerItemLeaderboardRecordDetails>()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
    if (!isExpanded.value) return
    if (!isLoading.value) return

    try {
        details.value = await sonolusGet({
            url: `/${paths[props.type]}/${props.name}/leaderboards/${props.leaderboardName}/records/${props.record.name}`,
        })
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div>
        <button
            class="flex w-full gap-10 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-12 sm:p-6"
            type="button"
            @click="isExpanded = !isExpanded"
        >
            <div class="ml-2.5 w-60 flex-shrink-0 text-left sm:ml-3 sm:w-72">
                {{ i18nText(record.rank) }}
            </div>
            <div class="flex-grow text-left">{{ record.player }}</div>
            <div class="flex-shrink-0">{{ i18nText(record.value) }}</div>
            <component
                :is="isExpanded ? IconAngleUp : IconAngleDown"
                class="size-20 flex-shrink-0 fill-current sm:size-24"
            />
        </button>
        <div
            class="grid bg-button-disabled transition-[grid-template-rows]"
            :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }"
            :inert="!isExpanded"
        >
            <div class="overflow-hidden">
                <div class="p-30 sm:p-36">
                    <Transition
                        mode="out-in"
                        enter-from-class="opacity-0"
                        enter-active-class="transition-opacity"
                        leave-to-class="opacity-0"
                        leave-active-class="transition-opacity"
                    >
                        <div v-if="isLoading" class="flex flex-col items-center gap-10 sm:gap-12">
                            <LoadingSpinner />
                            <span class="whitespace-break-spaces text-center">
                                {{
                                    i18n.clients.customServer[type].leaderboard.record.details
                                        .loading
                                }}
                            </span>
                        </div>

                        <div v-else-if="details" class="flex flex-col gap-10 sm:gap-12">
                            <ItemCard
                                v-for="replay in details.replays"
                                :key="replay.name"
                                type="replay"
                                :item="replay"
                            />
                        </div>

                        <div v-else class="flex justify-center">
                            <IconXMark class="size-50 fill-text-disabled sm:size-60" />
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
