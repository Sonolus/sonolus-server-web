<script setup lang="ts">
import { sonolusGet } from '@/client'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ViewSection from '@/components/ViewSection.vue'
import { i18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import { paths } from '@/utils/item'
import type { OverlayEmit } from '@/views/BaseView'
import CommunityInfo from '@/views/details/community/CommunityInfo.vue'
import type { ItemType, ServerItemCommunityInfo } from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
    title: string
}>()

defineEmits<OverlayEmit>()

const isLoading = ref(true)
const info = ref<ServerItemCommunityInfo>()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
    if (!isLoading.value) return

    try {
        info.value = undefined
        info.value = await sonolusGet({
            url: `/${paths[props.type]}/${props.name}/community/info`,
        })
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <ViewSection :title="i18n.routes.server.details.community.title">
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
                    {{ i18n.clients.customServer[type].community.info.loading }}
                </span>
            </div>

            <CommunityInfo
                v-else-if="info"
                :type
                :name
                :title
                :info
                @overlay="$emit('overlay', $event)"
                @update="isLoading = true"
            />

            <div v-else class="flex justify-center">
                <IconXMark class="size-50 fill-text-disabled sm:size-60" />
            </div>
        </Transition>
    </ViewSection>
</template>
