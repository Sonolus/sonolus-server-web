<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ViewSection from '@/components/ViewSection.vue'
import { dynamicIcons } from '@/dynamicIcons'
import { useI18n } from '@/i18n'
import IconAngleLeft from '@/icons/IconAngleLeft.vue'
import IconAngleRight from '@/icons/IconAngleRight.vue'
import IconAnglesLeft from '@/icons/IconAnglesLeft.vue'
import IconAnglesRight from '@/icons/IconAnglesRight.vue'
import IconCommunity from '@/icons/IconCommunity.vue'
import IconMore from '@/icons/IconMore.vue'
import IconXMark from '@/icons/IconXMark.vue'
import type { ItemType } from '@/utils/item'
import { names } from '@/utils/name'
import ItemCommunityComment from '@/views/details/ItemCommunityComment.vue'
import ItemCommunityCommentPaginationButton from '@/views/details/ItemCommunityCommentPaginationButton.vue'
import ItemCommunityCommentPaginationInput from '@/views/details/ItemCommunityCommentPaginationInput.vue'
import type { ItemCommunity, ItemCommunityCommentList } from '@sonolus/core'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
    type: ItemType
    name: string
}>()

const { locale, i18n, i18nText } = useI18n()

const isCommunityLoading = ref(true)
const community = ref<ItemCommunity>()

;(async () => {
    try {
        const searchParams = new URLSearchParams()
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${props.type}/${props.name}/community?${searchParams}`,
        )
        community.value = await response.json()
    } finally {
        isCommunityLoading.value = false
    }
})()

const showCommentList = ref(false)
const commentListPage = ref(0)
const isCommentListLoading = ref(true)
const commentList = ref<ItemCommunityCommentList>()

watchEffect(async () => {
    if (!showCommentList.value) return
    if (!isCommentListLoading.value) return

    try {
        const searchParams = new URLSearchParams()
        searchParams.append('page', `${commentListPage.value}`)
        searchParams.append('localization', locale.value)

        const response = await fetch(
            `${import.meta.env.BASE_URL}sonolus/${props.type}/${props.name}/community/comments/list?${searchParams}`,
        )
        commentList.value = await response.json()
    } finally {
        isCommentListLoading.value = false
    }
})

const jumpToPage = (page: number) => {
    commentListPage.value = page
    isCommentListLoading.value = true
}
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
            <div v-if="isCommunityLoading" class="flex flex-col items-center gap-10 sm:gap-12">
                <LoadingSpinner />
                <span class="whitespace-break-spaces text-center">
                    {{ i18n.clients.customServer[names[type]].community.loading }}
                </span>
            </div>
            <div v-else-if="community" class="flex flex-col gap-30 sm:gap-36">
                <div
                    v-if="community.actions.length"
                    class="flex flex-wrap justify-center gap-10 sm:gap-12"
                >
                    <div
                        v-for="(action, i) in community.actions"
                        :key="i"
                        class="flex min-w-120 gap-5 bg-button-disabled p-5 text-text-disabled sm:min-w-144 sm:gap-6 sm:p-6"
                        inert
                    >
                        <component
                            :is="dynamicIcons[action.icon ?? ''] ?? IconCommunity"
                            class="size-20 flex-shrink-0 fill-current sm:size-24"
                        />
                        <span class="flex-grow px-2.5 text-center sm:px-3">
                            {{ i18nText(action.title) }}
                        </span>
                    </div>
                </div>
                <Transition
                    mode="out-in"
                    enter-from-class="opacity-0"
                    enter-active-class="transition-opacity"
                    leave-to-class="opacity-0"
                    leave-active-class="transition-opacity"
                >
                    <div
                        v-if="
                            community.topComments.length && showCommentList && isCommentListLoading
                        "
                        class="flex flex-col items-center gap-10 sm:gap-12"
                    >
                        <LoadingSpinner />
                        <span class="whitespace-break-spaces text-center">
                            {{
                                i18n.clients.customServer[names[type]].community.comment.list
                                    .loading
                            }}
                        </span>
                    </div>
                    <div
                        v-else-if="community.topComments.length && showCommentList && commentList"
                        class="flex flex-col gap-10 sm:gap-12"
                    >
                        <ItemCommunityComment
                            v-for="(comment, j) in commentList.comments"
                            :key="j"
                            :comment
                        />
                        <div class="flex justify-center">
                            <ItemCommunityCommentPaginationButton
                                :icon="IconAnglesLeft"
                                :disabled="commentListPage <= 0"
                                @click="jumpToPage(0)"
                            />
                            <ItemCommunityCommentPaginationButton
                                :icon="IconAngleLeft"
                                :disabled="commentListPage <= 0"
                                @click="jumpToPage(commentListPage - 1)"
                            />
                            <ItemCommunityCommentPaginationInput
                                :page="commentListPage"
                                :count="commentList.pageCount"
                                @submit="jumpToPage"
                            />
                            <ItemCommunityCommentPaginationButton
                                :icon="IconAngleRight"
                                :disabled="
                                    commentList.pageCount !== -1 &&
                                    commentListPage >= commentList.pageCount - 1
                                "
                                @click="jumpToPage(commentListPage + 1)"
                            />
                            <ItemCommunityCommentPaginationButton
                                :icon="IconAnglesRight"
                                :disabled="
                                    commentList.pageCount === -1 ||
                                    commentListPage >= commentList.pageCount - 1
                                "
                                @click="jumpToPage(commentList.pageCount - 1)"
                            />
                        </div>
                    </div>
                    <div
                        v-else-if="community.topComments.length && showCommentList"
                        class="flex justify-center"
                    >
                        <IconXMark class="size-50 fill-text-disabled sm:size-60" />
                    </div>
                    <div
                        v-else-if="community.topComments.length"
                        class="flex flex-col gap-10 sm:gap-12"
                    >
                        <ItemCommunityComment
                            v-for="(comment, j) in community.topComments"
                            :key="j"
                            :comment
                        />
                        <div class="flex justify-center">
                            <button
                                class="flex min-w-120 items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:gap-6 sm:p-6"
                                @click="showCommentList = true"
                            >
                                <IconMore class="size-20 flex-shrink-0 fill-current sm:size-24" />
                                <span class="flex-grow px-2.5 text-center sm:px-3">
                                    {{ i18n.common.more }}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex h-30 items-center justify-center text-center text-text-disabled sm:h-36"
                    >
                        {{ i18n.routes.server.details.community.noComments }}
                    </div>
                </Transition>
            </div>
            <div v-else class="flex justify-center">
                <IconXMark class="size-50 fill-text-disabled sm:size-60" />
            </div>
        </Transition>
    </ViewSection>
</template>
