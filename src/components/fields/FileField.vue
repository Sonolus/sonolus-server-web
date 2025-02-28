<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import { digest } from '@/utils/sha1'
import type { ServerFileOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerFileOption
}>()

const values = defineModel<OptionValues>({ required: true })

const { value, isModified } = useValue(
    values,
    props.option,
    () => ({ value: props.option.def, files: {} }),
    (value) => value,
    (value) => value,
    (a, b) => a.value === b.value,
)

const onSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'

    const onSelect = async () => {
        const file = input.files?.[0]
        if (!file) {
            value.value = { value: '', files: {} }
            return
        }

        const buffer = await file.arrayBuffer()
        const hash = await digest(buffer)

        value.value = { value: hash, files: { [hash]: file } }
    }

    input.onchange = onSelect
    input.oncancel = onSelect

    input.click()
}
</script>

<template>
    <BaseField :option :display-value="value.value || i18n.common.none" :is-modified>
        <div class="flex justify-end gap-10 sm:gap-12">
            <AppButton @click="onSelect">
                {{ i18n.common.select }}
            </AppButton>
            <AppButton
                class="flex-shrink-0"
                :icon="IconXMark"
                @click="value = { value: '', files: {} }"
            />
            <UndoButton
                class="flex-shrink-0"
                :is-modified
                @click="value = { value: option.def, files: {} }"
            />
        </div>
        <div class="mt-10 whitespace-break-spaces sm:mt-12">
            {{ value.value || i18n.common.fileField.noSelected }}
        </div>
    </BaseField>
</template>
