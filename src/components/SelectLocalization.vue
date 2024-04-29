<script setup lang="ts">
import LanguageButton from '@/components/LanguageButton.vue'
import { useI18n } from '@/i18n'

const value = defineModel<boolean>()

const { locale, locales } = useI18n()

const selectLocale = (name: string) => {
    locale.value = name
    value.value = false
}
</script>

<template>
    <Transition
        enter-from-class="opacity-0"
        enter-active-class="transition-opacity"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity"
    >
        <div
            v-if="value"
            class="fixed left-0 top-0 z-20 h-[100vh] w-[100vw] bg-overlay-main p-30 sm:p-36"
        >
            <ul class="mx-auto mt-50 flex max-w-md flex-col items-center gap-10 sm:mt-60 sm:gap-12">
                <li v-for="meta in locales" :key="meta.name" class="w-full">
                    <LanguageButton @click="selectLocale(meta.name)">
                        {{ meta.title }}
                    </LanguageButton>
                </li>
            </ul>
        </div>
    </Transition>
</template>
