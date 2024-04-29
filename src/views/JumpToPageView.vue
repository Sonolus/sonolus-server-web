<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import TextInput from '@/components/TextInput.vue'
import { useI18n } from '@/i18n'
import IconArrowsTurnRight from '@/icons/IconArrowsTurnRight.vue'
import IconHashtag from '@/icons/IconHashtag.vue'
import type { ItemType } from '@/utils/item'
import { names } from '@/utils/name'
import { viewOptions } from '@/views/viewOptions'
import { computed, ref } from 'vue'

defineOptions(
    viewOptions<typeof props>({
        url: ({ type }) => `/${type}/list`,
        loading: ({ i18n, props: { type } }) => i18n.clients.customServer[names[type]].list.loading,
        error: ({ i18n, props: { type } }) =>
            i18n.clients.customServer[names[type]].list.error(import.meta.env.VITE_TITLE),

        title: ({ i18n }) => i18n.routes.jumpToPage.title,
    }),
)

const props = defineProps<{
    type: ItemType
    query: Record<string, string>
    data: {
        pageCount: number
    }
}>()

const { i18n } = useI18n()

const value = ref(`${(+props.query.page || 0) + 1}`)
const page = computed(() => +value.value - 1)
const disabled = computed(
    () => page.value < 0 || (props.data.pageCount !== -1 && page.value > props.data.pageCount - 1),
)
</script>

<template>
    <AppForm>
        <TextInput
            v-model="value"
            :icon="IconHashtag"
            :placeholder="i18n.routes.jumpToPage.page.placeholder"
        />
        <div class="mt-10 flex justify-end sm:mt-12">
            <AppButton
                :to="{ name: `${type}-list`, query: { ...query, page } }"
                :icon="IconArrowsTurnRight"
                :disabled
                data-submit
            >
                {{ i18n.routes.jumpToPage.jump }}
            </AppButton>
        </div>
    </AppForm>
</template>
