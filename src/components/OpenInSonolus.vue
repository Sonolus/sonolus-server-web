<script setup lang="ts">
import { computed, ref } from 'vue'
import LinkIcon from '../assets/link.svg'
import { useI18n } from '../i18n'

const props = defineProps<{
    deepLink: string
    noText?: boolean
}>()

const { i18n } = useI18n()

const url = computed(
    () =>
        'sonolus://' +
        window.location.host +
        import.meta.env.BASE_URL.slice(0, -1) +
        props.deepLink
)

const showInfo = ref(false)
const openInfo = () => (showInfo.value = true)
const closeInfo = () => (showInfo.value = false)
</script>

<template>
    <div>
        <a
            :href="url"
            class="flex cursor-pointer select-none space-x-2 bg-sonolus-ui-button-normal p-2 transition-colors hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:space-x-3 sm:p-3"
            @click="openInfo"
        >
            <img
                class="h-5 w-5 sm:h-6 sm:w-6"
                src="../assets/sonolus.png"
                alt="Sonolus"
            />
            <span
                v-if="!noText"
                class="min-w-[4.5rem] text-center sm:min-w-[6rem]"
            >
                {{ i18n.openInSonolus.title }}
            </span>
        </a>

        <Transition
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity"
            leave-to-class="opacity-0"
            leave-active-class="transition-opacity"
        >
            <div
                v-if="showInfo"
                class="fixed top-0 left-0 z-40 h-[100vh] w-[100vw] bg-sonolus-main bg-opacity-90"
                @click="closeInfo"
            >
                <main
                    class="mx-auto flex h-full max-w-4xl flex-col justify-center space-y-9 p-9 text-center sm:space-y-12 sm:p-12"
                >
                    <div class="py-1 text-xl font-bold sm:py-1.5 sm:text-3xl">
                        {{ i18n.openInSonolus.info.title }}
                    </div>
                    <div class="space-y-1 sm:space-y-1.5">
                        <p>{{ i18n.openInSonolus.info.tryAgain }}</p>
                        <a
                            class="space-x-1 underline sm:space-x-1.5"
                            :href="url"
                            @click.stop=""
                        >
                            <span>
                                {{ url }}
                            </span>
                            <LinkIcon
                                class="inline h-4 w-4 fill-current align-text-bottom sm:h-5 sm:w-5"
                            />
                        </a>
                    </div>
                    <div class="space-y-1 sm:space-y-1.5">
                        <p>{{ i18n.openInSonolus.info.download }}</p>
                        <a
                            class="space-x-1 underline sm:space-x-1.5"
                            href="https://sonolus.com"
                            target="_blank"
                            @click.stop=""
                        >
                            <span> https://sonolus.com </span>
                            <LinkIcon
                                class="inline h-4 w-4 fill-current align-text-bottom sm:h-5 sm:w-5"
                            />
                        </a>
                    </div>
                </main>
            </div>
        </Transition>
    </div>
</template>
