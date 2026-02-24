<script setup lang="ts">
import { computed } from 'vue'
import { uid } from '../../utils/uid'

export type TextboxType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

export interface TextboxBaseProps {
    modelValue?: string
    type?: TextboxType
    placeholder?: string
    isDisabled?: boolean
    isReadonly?: boolean
    hasError?: boolean
    autocomplete?: string
    maxlength?: number
}

const props = withDefaults(defineProps<TextboxBaseProps>(), {
    modelValue: '',
    type: 'text',
    isDisabled: false,
    isReadonly: false,
    hasError: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    focus: [event: FocusEvent]
}>()

const inputId = uid('textbox')

const inputClasses = computed(() => [
    'textbox__input',
    {
        'textbox__input--error': props.hasError,
        'is-disabled': props.isDisabled,
        'is-readonly': props.isReadonly,
    },
])

function onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <div class="textbox" data-testid="textbox-base">
        <input
            :id="inputId"
            :class="inputClasses"
            :type="props.type"
            :value="props.modelValue"
            :placeholder="props.placeholder"
            :disabled="props.isDisabled"
            :readonly="props.isReadonly"
            :autocomplete="props.autocomplete"
            :maxlength="props.maxlength"
            :aria-invalid="props.hasError || undefined"
            @input="onInput"
            @blur="emit('blur', $event)"
            @focus="emit('focus', $event)"
        />
    </div>
</template>

<style scoped>
.textbox {
    width: 100%;
}

.textbox__input {
    width: 100%;
    padding: 10px 1em;
    font-family: var(--font-ui);
    font-size: 1em;
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
</style>
