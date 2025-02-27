<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppForm from '@/components/AppForm.vue'
import { fields } from '@/components/fields'
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

const query = ref(
    props.query.type === props.form.type
        ? Object.fromEntries(new URLSearchParams(props.query))
        : { type: props.form.type },
)

const onSubmit = () => {
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
    emit('submit', { query: query.value })
}
</script>

<template>
    <AppForm>
        <ViewSection :title="i18nText(form.title)">
            <p v-if="form.description" class="whitespace-break-spaces">{{ form.description }}</p>

            <component
                :is="fields[option.type]"
                v-for="(option, key) in form.options"
                :key
                v-model="query"
                :option="option as never"
            />

            <div class="flex justify-end">
                <AppButton :icon data-submit @click="onSubmit">
                    <slot />
                </AppButton>
            </div>
        </ViewSection>
    </AppForm>
</template>
