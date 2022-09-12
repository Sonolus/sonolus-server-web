<script setup lang="ts">
import { computed, ref } from 'vue'
import HashtagIcon from '../assets/hashtag.svg?component'
import JumpIcon from '../assets/jump.svg?component'
import UndoIcon from '../assets/undo.svg?component'
import MyButton from '../components/MyButton.vue'
import MyTextInput from '../components/MyTextInput.vue'
import type { JumpState } from '../composables/jump'
import { useI18n } from '../i18n'

const props = defineProps<{
    state: JumpState
}>()

const defaultPage = `${props.state.page + 1}`
const page = ref(defaultPage)
const pageAsInt = computed(() => parseInt(page.value))

const { i18n } = useI18n()
</script>

<template>
    <div>
        <div class="py-2 font-bold sm:py-3">
            {{ i18n.routes.jumpToPage.page }}
        </div>
        <div
            class="ml-9 flex flex-grow items-center space-x-2 sm:ml-12 sm:space-x-3"
        >
            <MyTextInput
                class="relative flex-grow"
                :icon="HashtagIcon"
                :placeholder="i18n.routes.jumpToPage.pagePlaceholder"
                v-model="page"
            />
            <MyButton
                :icon="UndoIcon"
                :disabled="pageAsInt - 1 === state.page"
                @click="page = defaultPage"
            />
        </div>
    </div>

    <div class="flex justify-end">
        <MyButton
            :icon="JumpIcon"
            :to="{
                name: state.name,
                query: {
                    ...state.query,
                    page: pageAsInt - 1 || undefined,
                },
            }"
            :disabled="
                isNaN(pageAsInt) ||
                pageAsInt < 1 ||
                (state.pageCount !== -1 && pageAsInt > state.pageCount)
            "
        >
            {{ i18n.routes.jumpToPage.jump }}
        </MyButton>
    </div>
</template>
