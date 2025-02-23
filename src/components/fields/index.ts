import MultiField from '@/components/fields/MultiField.vue'
import SelectField from '@/components/fields/SelectField.vue'
import SliderField from '@/components/fields/SliderField.vue'
import TextAreaField from '@/components/fields/TextAreaField.vue'
import TextField from '@/components/fields/TextField.vue'
import ToggleField from '@/components/fields/ToggleField.vue'
import UnsupportedField from '@/components/fields/UnsupportedField.vue'

export const fields = {
    text: TextField,
    textArea: TextAreaField,
    slider: SliderField,
    toggle: ToggleField,
    select: SelectField,
    multi: MultiField,
    serverItem: UnsupportedField,
    serverItems: UnsupportedField,
    collectionItem: UnsupportedField,
    file: UnsupportedField,
} as const
