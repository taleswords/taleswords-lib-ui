<script setup lang="ts">
import { computed } from 'vue'

export interface ValidationEntry {
    hasError: boolean
    message: string
}

export interface FormFieldProps {
    label?: string
    description?: string
    isOptional?: boolean
    validationData?: ValidationEntry | ValidationEntry[] | Record<string, unknown>
}

const props = withDefaults(defineProps<FormFieldProps>(), {
    isOptional: false,
})

const errorMessages = computed<string[]>(() => {
    if (!props.validationData) return []

    if (Array.isArray(props.validationData)) {
        return props.validationData
            .filter((v) => v.hasError && v.message)
            .map((v) => v.message)
    }

    const entry = props.validationData as ValidationEntry
    if (entry.hasError && entry.message) {
        return [entry.message]
    }

    return []
})

const hasError = computed(() => errorMessages.value.length > 0)
</script>

<template>
    <div
        class="form-field"
        :class="{ 'form-field--error': hasError }"
        data-testid="form-field"
    >
        <label v-if="props.label" class="form-field__label">
            {{ props.label }}
            <span v-if="!props.isOptional" class="form-field__required" aria-label="required">*</span>
            <span v-else class="form-field__optional">(optional)</span>
        </label>

        <p v-if="props.description" class="form-field__description">
            {{ props.description }}
        </p>

        <div class="form-field__control">
            <slot />
        </div>

        <ul v-if="errorMessages.length" class="form-field__errors" role="alert">
            <li
                v-for="(msg, index) in errorMessages"
                :key="index"
                class="form-field__error"
            >
                {{ msg }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.375em;
    width: 100%;
}

.form-field__label {
    display: block;
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 0.9375em;
    color: var(--form-field-label-color);
    cursor: pointer;
    transition: color 0.3s;
}

.form-field:focus-within .form-field__label {
    color: var(--form-field-label-focus-color);
}

.form-field__required {
    color: var(--form-field-required-star);
    margin-left: 0.125em;
}

.form-field__optional {
    color: var(--form-field-description-color);
    font-weight: 400;
    font-size: 0.875em;
    margin-left: 0.25em;
}

.form-field__description {
    margin: 0;
    font-size: 0.8125em;
    color: var(--form-field-description-color);
    line-height: 1.4;
}

.form-field__control {
    width: 100%;
}

.form-field__errors {
    list-style: none;
    margin: 0;
    padding: 0;
}

.form-field__error {
    font-size: 0.8125em;
    color: var(--form-field-error-color);
    line-height: 1.4;
}
</style>
