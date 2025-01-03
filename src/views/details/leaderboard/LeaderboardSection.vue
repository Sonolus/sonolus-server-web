<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ViewSection from '@/components/ViewSection.vue'
import { useI18n } from '@/i18n'
import IconAngleDown from '@/icons/IconAngleDown.vue'
import IconAngleUp from '@/icons/IconAngleUp.vue'
import IconRadioOff from '@/icons/IconRadioOff.vue'
import IconRadioOn from '@/icons/IconRadioOn.vue'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import LeaderboardDetails from '@/views/details/leaderboard/LeaderboardDetails.vue'
import type { ItemType, ServerItemLeaderboard, ServerItemLeaderboardDetails } from '@sonolus/core'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
    leaderboards: ServerItemLeaderboard[]
}>()

const { locale, i18n, i18nText } = useI18n()

const isExpanded = ref(false)
const index = ref(0)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const leaderboardName = computed(() => props.leaderboards[index.value]!.name)

const isLoading = ref(true)
const details = ref<ServerItemLeaderboardDetails>()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
    try {
        isLoading.value = true
        details.value = undefined

        const searchParams = new URLSearchParams()
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${paths[props.type]}/${props.name}/leaderboards/${leaderboardName.value}?${searchParams}`,
        )
        details.value = (await response.json()) as never
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <ViewSection :title="i18n.routes.server.details.leaderboard.title">
        <div class="flex flex-col gap-30 sm:gap-36">
            <div>
                <button
                    class="flex w-full justify-between bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:p-6"
                    type="button"
                    @click="isExpanded = !isExpanded"
                >
                    <div class="ml-2.5 sm:ml-3">
                        {{ i18nText(leaderboards[index]?.title ?? '') }}
                    </div>
                    <component
                        :is="isExpanded ? IconAngleUp : IconAngleDown"
                        class="size-20 fill-current sm:size-24"
                    />
                </button>
                <div
                    class="grid bg-button-disabled transition-[grid-template-rows]"
                    :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }"
                    :inert="!isExpanded"
                >
                    <div class="overflow-hidden">
                        <div class="flex flex-wrap gap-10 p-30 sm:gap-12 sm:p-36">
                            <button
                                v-for="(leaderboard, i) in leaderboards"
                                :key="leaderboard.name"
                                class="flex items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-6 sm:p-6"
                                type="button"
                                @click="index = i"
                            >
                                <component
                                    :is="index === i ? IconRadioOn : IconRadioOff"
                                    class="size-20 fill-current sm:size-24"
                                />
                                <span class="px-2.5 text-center sm:px-3">
                                    {{ i18nText(leaderboard.title) }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                        {{ i18n.clients.customServer[type].leaderboard.details.loading }}
                    </span>
                </div>

                <LeaderboardDetails
                    v-else-if="details"
                    :key="index"
                    :type
                    :name
                    :leaderboard-name
                    :details
                />

                <div v-else class="flex justify-center">
                    <IconXMark class="size-50 fill-text-disabled sm:size-60" />
                </div>
            </Transition>
        </div>
    </ViewSection>
</template>
