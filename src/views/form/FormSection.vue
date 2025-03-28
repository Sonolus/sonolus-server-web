<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import { fields } from '@/components/fields'
import type { OptionValues } from '@/components/fields/value'
import RichText from '@/components/RichText.vue'
import ViewSection from '@/components/ViewSection.vue'
import { i18n, i18nText } from '@/i18n'
import type { OverlayEmit } from '@/views/BaseView'
import type { FormResult } from '@/views/form'
import type { ServerForm } from '@sonolus/core'
import { ref, type Component } from 'vue'

const props = defineProps<{
    form: ServerForm
    query: Record<string, string>
    icon: Component
}>()

const emit = defineEmits<
    OverlayEmit & {
        submit: [result: FormResult]
    }
>()

const values = ref<OptionValues>(
    props.query.type === props.form.type
        ? Object.fromEntries(
              [...new URLSearchParams(props.query).entries()].map(([key, value]) => [
                  key,
                  { value, files: {} },
              ]),
          )
        : {
              type: { value: props.form.type, files: {} },
          },
)

const isValidating = ref(false)

const onSubmit = () => {
    isValidating.value = true

    if (props.form.options.some((option) => option.required && !(option.query in values.value))) {
        emit('overlay', {
            type: 'error',
            getMessage: () => i18n.value.routes.server.forms.validationError,
        })
        return
    }

    if (props.form.requireConfirmation) {
        emit('overlay', {
            type: 'confirm',
            getMessage: () =>
                i18n.value.routes.server.forms.confirmation(i18nText(props.form.title)),
            onConfirm: submit,
        })
    } else {
        submit()
    }
}

const submit = () => {
    emit('submit', {
        query: Object.fromEntries(
            Object.entries(values.value).map(([key, { value }]) => [key, value]),
        ),
        files: Object.fromEntries(
            Object.entries(values.value).flatMap(([, { files }]) => Object.entries(files)),
        ),
    })
}
</script>

<template>
    <AppForm>
        <ViewSection :title="i18nText(form.title)">
            <RichText v-if="form.description" :text="form.description" />

            <component
                :is="fields[option.type]"
                v-for="(option, key) in form.options"
                :key
                v-model="values"
                :option="option as never"
                :is-validating
            />

            <div class="flex justify-end">
                <AppButton :icon data-submit @click="onSubmit">
                    <slot />
                </AppButton>
            </div>
        </ViewSection>
    </AppForm>
</template>
