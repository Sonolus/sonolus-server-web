<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import { i18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import type { ServerFileOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerFileOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { value, isModified } = useQuery(
    query,
    props.option,
    () => props.option.def,
    (value) => value,
    (value) => value,
)

const onSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'

    const onSelect = async () => {
        const file = input.files?.[0]
        if (!file) {
            value.value = ''
            return
        }

        const buffer = await file.arrayBuffer()
        const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-1', buffer))]
            .map((x) => x.toString(16).padStart(2, '0'))
            .join('')

        value.value = hash
    }

    input.onchange = onSelect
    input.oncancel = onSelect

    input.click()
}
</script>

<template>
    <BaseField :option :display-value="value || i18n.common.none" :is-modified>
        <div class="flex justify-end gap-10 sm:gap-12">
            <AppButton @click="onSelect">
                {{ i18n.common.select }}
            </AppButton>
            <AppButton class="flex-shrink-0" :icon="IconXMark" @click="value = ''" />
            <UndoButton class="flex-shrink-0" :is-modified @click="value = option.def" />
        </div>
        <div class="mt-10 whitespace-break-spaces sm:mt-12">
            {{ value || i18n.common.fileField.noSelected }}
        </div>
    </BaseField>
</template>
