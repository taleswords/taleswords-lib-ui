<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { uid } from '../../utils/uid'
import { useBufferedModel } from '../../composables/useBufferedModel'

export type TextboxType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date'
export type TextboxVariant = 'default' | 'narrative'

export interface TextboxBaseProps {
    modelValue?: string
    type?: TextboxType
    variant?: TextboxVariant
    placeholder?: string
    isDisabled?: boolean
    isReadonly?: boolean
    hasError?: boolean
    autocomplete?: string
    maxlength?: number
    min?: string
    max?: string
    multiline?: boolean
    rows?: number
    autosize?: boolean
}

const props = withDefaults(defineProps<TextboxBaseProps>(), {
    modelValue: '',
    type: 'text',
    variant: 'default',
    isDisabled: false,
    isReadonly: false,
    hasError: false,
    multiline: false,
    autosize: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    focus: [event: FocusEvent]
}>()

const inputId = uid('textbox')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const {
    displayValue,
    onInput: bufferedOnInput,
    onFocus: bufferedOnFocus,
    onBlur: bufferedOnBlur,
} = useBufferedModel(props, emit)

const inputClasses = computed(() => [
    'textbox__input',
    {
        'textbox__input--narrative': props.variant === 'narrative',
        'textbox__input--error': props.hasError,
        'textbox__input--single': !props.multiline,
        'textbox__input--multiline': props.multiline,
        'textbox__input--autosize': props.multiline && props.autosize,
        'textbox__input--date': !props.multiline && props.type === 'date',
        'is-empty': displayValue.value === '',
        'is-disabled': props.isDisabled,
        'is-readonly': props.isReadonly,
    },
])

function adjustHeight(): void {
    const el = textareaRef.value
    if (!el) return

    if (el.offsetParent === null) return

    el.style.height = 'auto'
    const height = el.scrollHeight

    if (height === 0) return

    el.style.height = `${height}px`
}

function onInput(event: Event): void {
    bufferedOnInput(event)
    if (props.multiline && props.autosize) {
        adjustHeight()
    }
}

function onFocus(event: FocusEvent): void {
    bufferedOnFocus()
    emit('focus', event)
}

function onBlur(event: FocusEvent): void {
    bufferedOnBlur()
    emit('blur', event)
}

onMounted(() => {
    if (props.multiline && props.autosize) {
        adjustHeight()
    }
})

watch(
    () => props.modelValue,
    () => {
        if (props.multiline && props.autosize) {
            nextTick(adjustHeight)
        }
    },
)
</script>

<template>
    <div class="textbox" data-testid="textbox-base">
        <textarea
            v-if="props.multiline"
            :id="inputId"
            ref="textareaRef"
            :class="inputClasses"
            :value="displayValue"
            :placeholder="props.placeholder"
            :disabled="props.isDisabled"
            :readonly="props.isReadonly"
            :autocomplete="props.autocomplete"
            :maxlength="props.maxlength"
            :rows="props.rows"
            :aria-invalid="props.hasError || undefined"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus"
        />
        <input
            v-else
            :id="inputId"
            :class="inputClasses"
            :type="props.type"
            :value="displayValue"
            :placeholder="props.placeholder"
            :disabled="props.isDisabled"
            :readonly="props.isReadonly"
            :autocomplete="props.autocomplete"
            :maxlength="props.maxlength"
            :min="props.min"
            :max="props.max"
            :aria-invalid="props.hasError || undefined"
            @input="onInput"
            @blur="onBlur"
            @focus="onFocus"
        />
    </div>
</template>

<style scoped>
.textbox {
    width: 100%;
}

.textbox__input {
    width: 100%;
    padding: calc(0.625rem * var(--density-scale)) calc(1em * var(--density-scale));
    font-family: var(--textbox-font);
    font-size: var(--textbox-size);
    color: var(--textbox-text);
    background-color: var(--textbox-bg);
    border: 1px solid var(--textbox-border);
    border-radius: var(--textbox-border-radius);
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.textbox__input::placeholder {
    color: var(--textbox-placeholder);
}

.textbox__input:focus {
    outline: none;
    border-color: var(--textbox-border-focus);
    box-shadow: var(--textbox-shadow-focus);
}

.textbox__input.is-disabled {
    background-color: var(--textbox-bg-disabled);
    border-color: var(--textbox-border-disabled);
    color: var(--textbox-text-disabled);
    cursor: not-allowed;
}

.textbox__input.is-readonly {
    cursor: default;
}

.textbox__input--error {
    border-color: var(--textbox-border-error);
}

.textbox__input--error:focus {
    border-color: var(--textbox-border-error-focus);
}

/* A single-line input stands at the one control height (2.7.0): an explicit
   line, so the height does not depend on the consumer's reset. */
.textbox__input--single {
    height: var(--control-height);
    line-height: var(--control-line-height);
}

.textbox__input--narrative {
    font-family: var(--narrative-font);
    font-size: var(--narrative-size);
    line-height: var(--narrative-leading);
}

.textbox__input--multiline {
    resize: vertical;
    line-height: var(--textbox-leading, var(--leading-normal));
}

.textbox__input--autosize {
    resize: none;
    overflow-y: hidden;
}

/* The browser's own date input: its picker and indicator follow the theme,
   and its empty segments read as a placeholder where the engine exposes them. */
.textbox__input--date {
    color-scheme: var(--textbox-color-scheme);
}

.textbox__input--date.is-empty::-webkit-datetime-edit {
    color: var(--textbox-placeholder);
}

.textbox__input--date:not(.is-disabled)::-webkit-calendar-picker-indicator {
    cursor: pointer;
}
</style>
