<script setup lang="ts">
import type { UiToggleProps } from '../types'

const props = withDefaults(defineProps<UiToggleProps>(), {
    disabled: false,
    size: 'medium',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function toggle() {
    if (props.disabled) return
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <label
        class="ui-toggle"
        :class="[
            `ui-toggle--${props.size}`,
            {
                'ui-toggle--checked': props.modelValue,
                'ui-toggle--disabled': props.disabled,
            },
        ]"
    >
        <input
            type="checkbox"
            class="ui-toggle__input"
            :checked="props.modelValue"
            :disabled="props.disabled"
            @change="toggle"
        />
        <span class="ui-toggle__track">
            <span class="ui-toggle__thumb" />
        </span>
        <span v-if="props.label" class="ui-toggle__label">{{ props.label }}</span>
    </label>
</template>

<style scoped>
.ui-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.75em;
    cursor: pointer;
    user-select: none;
}

.ui-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.ui-toggle__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.ui-toggle__track {
    position: relative;
    background-color: var(--ui-secondary-btn);
    border-radius: 999px;
    transition: background-color 0.2s;
}

.ui-toggle--checked .ui-toggle__track {
    background-color: var(--ui-primary-btn);
}

.ui-toggle__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.ui-toggle--checked .ui-toggle__thumb {
    transform: translateX(100%);
}

.ui-toggle__label {
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    color: var(--ui-input-label-color);
}

/* Size: small */
.ui-toggle--small .ui-toggle__track {
    width: 32px;
    height: 18px;
}

.ui-toggle--small .ui-toggle__thumb {
    width: 14px;
    height: 14px;
}

/* Size: medium */
.ui-toggle--medium .ui-toggle__track {
    width: 44px;
    height: 24px;
}

.ui-toggle--medium .ui-toggle__thumb {
    width: 20px;
    height: 20px;
}

/* Size: large */
.ui-toggle--large .ui-toggle__track {
    width: 56px;
    height: 30px;
}

.ui-toggle--large .ui-toggle__thumb {
    width: 26px;
    height: 26px;
}

/* Focus state */
.ui-toggle__input:focus-visible + .ui-toggle__track {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: 2px;
}
</style>
