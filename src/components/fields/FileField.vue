<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18n } from '@/i18n'
import IconXMark from '@/icons/IconXMark.vue'
import { digest } from '@/utils/sha1'
import type { ServerFileOption } from '@sonolus/core'
import { getAudioInfo } from '../../utils/audio'
import { isGzippedJson } from '../../utils/gzippedJson'
import { getImageInfo } from '../../utils/image'

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

        if (props.option.validation) {
            const validation = props.option.validation

            if (buffer.byteLength < (validation.minSize ?? 0)) {
                alert(i18n.value.common.fileField.validation.minSize)
                return
            }
            if (buffer.byteLength > (validation.maxSize ?? Number.POSITIVE_INFINITY)) {
                alert(i18n.value.common.fileField.validation.maxSize)
                return
            }

            switch (validation.type) {
                case 'file':
                case 'engineRom':
                    break

                case 'image':
                case 'serverBanner':
                case 'postThumbnail':
                case 'playlistThumbnail':
                case 'levelCover':
                case 'skinThumbnail':
                case 'skinTexture':
                case 'backgroundThumbnail':
                case 'backgroundImage':
                case 'effectThumbnail':
                case 'particleThumbnail':
                case 'particleTexture':
                case 'engineThumbnail':
                case 'roomCover': {
                    const info = await getImageInfo(buffer)
                    if (!info) {
                        alert(i18n.value.common.fileField.validation.invalid)
                        return
                    }

                    if (info.width < (validation.minWidth ?? 0)) {
                        alert(i18n.value.common.fileField.validation.image.minWidth)
                        return
                    }
                    if (info.width > (validation.maxWidth ?? Number.POSITIVE_INFINITY)) {
                        alert(i18n.value.common.fileField.validation.image.maxWidth)
                        return
                    }

                    if (info.height < (validation.minHeight ?? 0)) {
                        alert(i18n.value.common.fileField.validation.image.minHeight)
                        return
                    }
                    if (info.height > (validation.maxHeight ?? Number.POSITIVE_INFINITY)) {
                        alert(i18n.value.common.fileField.validation.image.maxHeight)
                        return
                    }
                    break
                }

                case 'audio':
                case 'levelBgm':
                case 'levelPreview':
                case 'roomBgm':
                case 'roomPreview': {
                    const info = await getAudioInfo(buffer)
                    if (!info) {
                        alert(i18n.value.common.fileField.validation.invalid)
                        return
                    }

                    if (info.length < (validation.minLength ?? 0)) {
                        alert(i18n.value.common.fileField.validation.audio.minLength)
                        return
                    }
                    if (info.length > (validation.maxLength ?? Number.POSITIVE_INFINITY)) {
                        alert(i18n.value.common.fileField.validation.audio.maxLength)
                        return
                    }
                    break
                }

                case 'zip':
                case 'effectAudio':
                    break

                case 'levelData':
                case 'skinData':
                case 'backgroundData':
                case 'backgroundConfiguration':
                case 'effectData':
                case 'particleData':
                case 'enginePlayData':
                case 'engineWatchData':
                case 'enginePreviewData':
                case 'engineTutorialData':
                case 'engineConfiguration':
                case 'replayData':
                case 'replayConfiguration':
                    if (!(await isGzippedJson(buffer))) {
                        alert(i18n.value.common.fileField.validation.invalid)
                        return
                    }
                    break
            }
        }

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
