<script setup lang="ts">
export type SwitchSize = 'small' | 'medium' | 'large'

export interface SwitchProps {
    modelValue?: boolean
    label?: string
    size?: SwitchSize
    isDisabled?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
    modelValue: false,
    size: 'medium',
    isDisabled: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

function toggle(): void {
    if (props.isDisabled) return
    emit('update:modelValue', !props.modelValue)
}
</script>

<template>
    <label
        class="switch"
        :class="[
            `switch--${props.size}`,
            {
                'switch--checked': props.modelValue,
                'is-disabled': props.isDisabled,
            },
        ]"
        data-testid="switch"
    >
        <input
            type="checkbox"
            class="switch__native"
            :checked="props.modelValue"
            :disabled="props.isDisabled"
            role="switch"
            :aria-checked="props.modelValue"
            @change="toggle"
        />
        <span class="switch__track">
            <span class="switch__thumb" />
        </span>
        <span v-if="props.label" class="switch__label">{{ props.label }}</span>
    </label>
</template>

<style scoped>
.switch {
    display: inline-flex;
    align-items: center;
    gap: 0.75em;
    cursor: pointer;
    user-select: none;
}

.switch.is-disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.switch__native {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
}

.switch__track {
    position: relative;
    background-color: var(--switch-track-bg);
    border-radius: 999px;
    transition: background-color 0.2s;
    flex-shrink: 0;
}

.switch--checked .switch__track {
    background-color: var(--switch-track-bg-checked);
}

.switch.is-disabled .switch__track {
    background-color: var(--switch-track-bg-disabled);
}

.switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: var(--switch-thumb-bg);
    border-radius: 50%;
    box-shadow: var(--switch-thumb-shadow);
    transition: transform 0.2s;
}

.switch.is-disabled .switch__thumb {
    background-color: var(--switch-thumb-bg-disabled);
}

.switch--checked .switch__thumb {
    transform: translateX(100%);
}

/* Sizes */
.switch--small .switch__track {
    width: 32px;
    height: 18px;
}

.switch--small .switch__thumb {
    width: 14px;
    height: 14px;
}

.switch--medium .switch__track {
    width: 44px;
    height: 24px;
}

.switch--medium .switch__thumb {
    width: 20px;
    height: 20px;
}

.switch--large .switch__track {
    width: 56px;
    height: 30px;
}

.switch--large .switch__thumb {
    width: 26px;
    height: 26px;
}

/* Focus */
.switch__native:focus-visible + .switch__track {
    outline: none;
    border: 1px solid var(--general-focus-ring);
    box-shadow: 0 0 0 2px var(--general-focus-ring);
}

.switch__label {
    font-family: var(--label-font);
    font-weight: var(--label-weight);
    color: var(--form-field-label-color);
}
</style>
