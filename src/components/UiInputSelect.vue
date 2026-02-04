<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UiInputSelectProps } from '../types'

const props = withDefaults(defineProps<UiInputSelectProps>(), {
    required: false,
    disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const isOpen = ref(false)
const isFocused = ref(false)
const isSwitchingOff = ref(false)
const highlightedIndex = ref(-1)
const hiddenInputRef = ref<HTMLInputElement | null>(null)

const selectedOption = computed(() =>
    props.options.find((opt) => opt.value === props.modelValue)
)

function handleFocus() {
    isFocused.value = true
    isOpen.value = true
    highlightedIndex.value = props.options.findIndex(opt => opt.value === props.modelValue)
}

function handleBlur() {
    isSwitchingOff.value = true
    setTimeout(() => {
        isOpen.value = false
        isSwitchingOff.value = false
        isFocused.value = false
        highlightedIndex.value = -1
    }, 200)
}

function toggleDropdown() {
    if (props.disabled) return
    if (!isFocused.value) {
        hiddenInputRef.value?.focus()
    } else {
        hiddenInputRef.value?.blur()
    }
}

function selectOption(value: string) {
    emit('update:modelValue', value)
    isOpen.value = false
    hiddenInputRef.value?.focus()
    setTimeout(() => {
        hiddenInputRef.value?.blur()
    })
}

function handleKeydown(e: KeyboardEvent) {
    if (!isOpen.value) return

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            highlightedIndex.value = (highlightedIndex.value + 1) % props.options.length
            break
        case 'ArrowUp':
            e.preventDefault()
            highlightedIndex.value = (highlightedIndex.value - 1 + props.options.length) % props.options.length
            break
        case 'Enter':
            e.preventDefault()
            if (highlightedIndex.value >= 0 && highlightedIndex.value < props.options.length) {
                selectOption(props.options[highlightedIndex.value].value)
            }
            break
        case 'Escape':
            e.preventDefault()
            hiddenInputRef.value?.blur()
            break
    }
}
</script>

<template>
    <div
        class="ui-input-select"
        :class="{ 'ui-input-select--active': isOpen }"
    >
        <label
            v-if="props.label"
            class="ui-input-select__label"
            :class="{ 'ui-input-select__label--required': props.required }"
        >{{ props.label }}</label>
        <input
            ref="hiddenInputRef"
            type="text"
            readonly
            class="ui-input-select__hidden"
            :value="selectedOption?.label ?? ''"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
        />
        <div
            class="ui-input-select__display"
            :class="{
                'ui-input-select__display--error': props.error,
                'ui-input-select__display--disabled': props.disabled,
            }"
            :aria-expanded="isOpen"
            @click="toggleDropdown"
        >
            <span v-if="selectedOption" class="ui-input-select__display-text">{{ selectedOption.label }}</span>
            <span v-else class="ui-input-select__placeholder">{{ props.placeholder }}</span>
        </div>
        <div
            class="ui-input-select__dropdown-position"
            :class="{ 'ui-input-select__dropdown-position--hiding': isSwitchingOff }"
        >
            <div class="ui-input-select__dropdown">
                <div class="ui-input-select__dropdown-content" role="listbox">
                    <div class="ui-input-select__dropdown-cap" />
                    <div class="ui-input-select__dropdown-mid">
                        <div
                            v-for="(option, index) in props.options"
                            :key="option.value"
                            role="option"
                            :aria-selected="option.value === props.modelValue"
                            class="ui-input-select__option"
                            :class="{ 'ui-input-select__option--highlighted': index === highlightedIndex }"
                            @click="selectOption(option.value)"
                        >{{ option.label }}</div>
                    </div>
                    <div class="ui-input-select__dropdown-cap ui-input-select__dropdown-cap--bottom" />
                </div>
            </div>
        </div>
        <span v-if="props.error" class="ui-input-select__error">{{ props.error }}</span>
    </div>
</template>

<style scoped>
.ui-input-select {
    width: 100%;
    margin-bottom: 2em;
    position: relative;
}

@media only screen and (min-width: 540px) {
    .ui-input-select {
        margin-bottom: 1em;
    }
}

.ui-input-select__label {
    display: block;
    margin-bottom: 0.5em;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    color: var(--ui-input-label-color);
    transition: color 0.3s;
}

.ui-input-select--active .ui-input-select__label {
    color: var(--ui-input-label-focus);
}

.ui-input-select__label--required::after {
    content: ' *';
    color: var(--ui-input-label-required-star-color);
}

.ui-input-select__hidden {
    opacity: 0.001;
    position: absolute;
    z-index: -1;
}

.ui-input-select__display {
    background-color: var(--ui-input-bg);
    border: 1px solid var(--ui-input-border-color);
    border-radius: 6px;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    padding: 12px 1em;
    display: flex;
    gap: 1em;
    align-items: center;
}

@media only screen and (min-width: 840px) {
    .ui-input-select__display {
        padding: 8px 1em;
    }
}

.ui-input-select__display--disabled {
    background-color: var(--ui-input-disabled-bg);
    border-color: var(--ui-input-disabled-border-color);
    opacity: 0.65;
    cursor: not-allowed;
}

.ui-input-select__display--error {
    border-color: var(--ui-input-error-border-color);
}

.ui-input-select--active .ui-input-select__display {
    border-color: var(--ui-input-focus-border-color);
    box-shadow: var(--ui-input-focus-shadow);
}

.ui-input-select__display-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ui-input-select__placeholder {
    color: var(--ui-input-placeholder-color);
}

.ui-input-select__dropdown-position {
    position: relative;
    width: 100%;
    top: 4px;
    z-index: 100;
}

.ui-input-select__dropdown-position--hiding {
    opacity: 0.01;
}

.ui-input-select__dropdown {
    width: 100%;
    position: absolute;
    display: none;
    opacity: 0;
    transition: opacity 0.3s, box-shadow 0.3s;
    padding-bottom: 48px;
}

.ui-input-select__dropdown-content {
    background-color: var(--ui-input-bg);
}

.ui-input-select--active .ui-input-select__dropdown {
    display: block;
    opacity: 1;
    z-index: 5;
}

.ui-input-select--active .ui-input-select__dropdown-content {
    box-shadow: var(--ui-input-focus-shadow);
    border-radius: 6px;
}

.ui-input-select__dropdown-cap {
    border: 1px solid var(--ui-input-border-color);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    box-sizing: border-box;
    height: 6px;
    border-bottom: 0;
    background-color: var(--ui-input-bg);
}

.ui-input-select__dropdown-cap--bottom {
    border-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid var(--ui-input-border-color);
    border-top: 0;
}

.ui-input-select__dropdown-mid {
    max-height: 250px;
    overflow: auto;
}

.ui-input-select__option {
    background-color: var(--ui-input-bg);
    padding-block: 1em;
    padding-inline: 1em;
    border: 1px solid var(--ui-input-border-color);
    border-bottom: 0;
    transition: border-color 0.3s, box-shadow 0.3s;
    position: relative;
    cursor: pointer;
    display: flex;
    gap: 1em;
    align-items: center;
}

.ui-input-select__option:hover,
.ui-input-select__option--highlighted {
    box-shadow: var(--ui-input-focus-shadow);
    border: 1px solid var(--ui-input-focus-border-color);
    border-bottom: 0;
    z-index: 1;
}

.ui-input-select--active .ui-input-select__option:hover + .ui-input-select__option {
    border-top-color: var(--ui-input-focus-border-color);
}

.ui-input-select__option:last-child {
    border-bottom: 1px solid var(--ui-input-border-color);
}

.ui-input-select__option:last-child:hover {
    border-bottom: 1px solid var(--ui-input-focus-border-color);
}

.ui-input-select__error {
    display: block;
    margin-top: 0.5em;
    font-size: 0.875em;
    color: var(--ui-error-text-color);
}
</style>
