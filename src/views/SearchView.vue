<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LocationQuery } from 'vue-router'
import KeyboardIcon from '../assets/keyboard.svg?component'
import SearchIcon from '../assets/search.svg?component'
import UndoIcon from '../assets/undo.svg?component'
import MyButton from '../components/MyButton.vue'
import MySlider from '../components/MySlider.vue'
import MyTextInput from '../components/MyTextInput.vue'
import MyToggle from '../components/MyToggle.vue'
import type { SearchState } from '../composables/search'
import { useI18n } from '../i18n'

const props = defineProps<{
    state: SearchState
}>()

const { i18n } = useI18n()

const toValues = (query: LocationQuery) => {
    const values: Record<string, any> = {}

    props.state.search.options.forEach((option) => {
        switch (option.type) {
            case 'text': {
                const value = query[option.query]
                values[option.query] = value ? `${value}` : ''
                break
            }
            case 'slider': {
                const value = +`${query[option.query]}`
                values[option.query] = isNaN(value) ? option.def : value
                break
            }
            case 'toggle': {
                const value = parseInt(`${query[option.query]}`)
                values[option.query] = (isNaN(value) ? option.def : value) !== 0
                break
            }
            case 'select': {
                const value = parseInt(`${query[option.query]}`)
                values[option.query] = isNaN(value) ? option.def : value
                break
            }
        }
    })

    return values
}

const values = ref(toValues(props.state.query))

const query = computed(() => {
    const query: Record<string, any> = {}

    props.state.search.options.forEach((option) => {
        const value = values.value[option.query]
        switch (option.type) {
            case 'text':
                if (value === '') {
                    delete query[option.query]
                } else {
                    query[option.query] = value
                }
                break
            case 'slider':
                if (value === option.def) {
                    delete query[option.query]
                } else {
                    query[option.query] = `${value}`
                }
                break
            case 'toggle':
                if ((value ? 1 : 0) === option.def) {
                    delete query[option.query]
                } else {
                    query[option.query] = value ? '1' : '0'
                }
                break
            case 'select':
                if (value === option.def) {
                    delete query[option.query]
                } else {
                    query[option.query] = `${value}`
                }
                break
        }
    })

    return query
})
</script>

<template>
    <div class="flex flex-col space-y-2 sm:space-y-3">
        <div v-for="(option, index) in state.search.options" :key="index">
            <div class="py-2 font-bold sm:py-3">
                {{ i18n.getName(option.name) }}
            </div>
            <div
                class="ml-9 flex flex-grow items-center space-x-2 sm:ml-12 sm:space-x-3"
            >
                <template v-if="option.type === 'text'">
                    <MyTextInput
                        class="relative flex-grow"
                        :icon="KeyboardIcon"
                        :placeholder="i18n.getPlaceholder(option.placeholder)"
                        v-model="values[option.query]"
                    />
                    <MyButton
                        :icon="UndoIcon"
                        :disabled="values[option.query] === ''"
                        @click="values[option.query] = ''"
                    />
                </template>
                <template v-if="option.type === 'slider'">
                    <div class="w-12 text-center sm:w-16">
                        {{ values[option.query] }}
                    </div>
                    <MySlider
                        class="flex-grow"
                        :min="option.min"
                        :max="option.max"
                        :step="option.step"
                        v-model="values[option.query]"
                    />
                    <MyButton
                        :icon="UndoIcon"
                        :disabled="values[option.query] === option.def"
                        @click="values[option.query] = option.def"
                    />
                </template>
                <template v-if="option.type === 'toggle'">
                    <div class="w-12 text-center sm:w-16">
                        {{
                            values[option.query]
                                ? i18n.common.on
                                : i18n.common.off
                        }}
                    </div>
                    <div class="flex-grow" />
                    <MyToggle v-model="values[option.query]" />
                    <MyButton
                        :icon="UndoIcon"
                        :disabled="values[option.query] === (option.def != 0)"
                        @click="values[option.query] = option.def != 0"
                    />
                </template>
                <template v-if="option.type === 'select'">
                    <div
                        class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {{ i18n.getValue(option.values[values[option.query]]) }}
                    </div>
                    <select
                        class="w-36 text-ellipsis border-none bg-sonolus-ui-button-normal p-2 text-center text-sm hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:w-48 sm:p-3 sm:text-base"
                        v-model="values[option.query]"
                    >
                        <option
                            class="bg-sonolus-ui-surface"
                            v-for="(value, index) in option.values"
                            :key="index"
                            :value="index"
                        >
                            {{ i18n.getValue(value) }}
                        </option>
                    </select>
                    <MyButton
                        :icon="UndoIcon"
                        :disabled="values[option.query] === option.def"
                        @click="values[option.query] = option.def"
                    />
                </template>
            </div>
        </div>
    </div>

    <div class="flex justify-end">
        <MyButton :icon="SearchIcon" :to="{ name: state.name, query }">
            {{ i18n.common.search }}
        </MyButton>
    </div>
</template>
