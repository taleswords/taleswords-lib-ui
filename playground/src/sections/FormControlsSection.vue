<script setup lang="ts">
import { ref } from 'vue'
import {
    UiButton,
    UiCard,
    UiInputField,
    UiTextarea,
    UiCheckboxField,
    UiToggle,
    UiInputSelect,
} from '@lib'

// Input field
const inputValue = ref('')
const inputError = ref('')
const inputDisabled = ref(false)

// Checkbox
const checkboxValue = ref(false)

// Toggle
const toggleValue = ref(false)

// Textarea
const textareaValue = ref('')

// Input select
const selectValue = ref('')
const selectOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
    { label: 'Option D', value: 'd' },
]
</script>

<template>
    <!-- UiInputField -->
    <UiCard variant="outlined">
        <h2>UiInputField</h2>
        <UiCard row>
            <label><input type="checkbox" v-model="inputDisabled" /> Disabled</label>
            <UiButton
                size="small"
                variant="danger"
                @click="inputError = inputError ? '' : 'This field is required'"
            >Toggle Error</UiButton>
        </UiCard>
        <div class="form-area">
            <UiInputField
                v-model="inputValue"
                label="Username"
                placeholder="Enter your username"
                required
                :disabled="inputDisabled"
                :error="inputError"
            />
            <UiInputField
                v-model="inputValue"
                label="Email"
                type="email"
                placeholder="you@example.com"
            />
            <UiInputField
                v-model="inputValue"
                label="Password"
                type="password"
                placeholder="Enter password"
            />
            <p>Value: {{ inputValue }}</p>
        </div>
    </UiCard>

    <!-- UiTextarea -->
    <UiCard variant="outlined">
        <h2>UiTextarea</h2>
        <div class="form-area">
            <UiTextarea
                v-model="textareaValue"
                label="Description"
                placeholder="Enter a description..."
                :rows="4"
                :max-length="200"
                show-counter
                required
            />
            <UiTextarea
                v-model="textareaValue"
                label="Disabled Textarea"
                disabled
            />
            <UiTextarea
                v-model="textareaValue"
                label="With Error"
                error="This field has an error"
            />
            <p>Value: {{ textareaValue }}</p>
        </div>
    </UiCard>

    <!-- UiCheckboxField -->
    <UiCard variant="outlined">
        <h2>UiCheckboxField</h2>
        <div class="form-area">
            <UiCheckboxField
                v-model="checkboxValue"
                label="I agree to the terms and conditions"
            />
            <UiCheckboxField
                :model-value="false"
                label="This has an error"
                error="You must accept"
            />
            <UiCheckboxField
                :model-value="true"
                label="Disabled checkbox"
                disabled
            />
            <p>Checked: {{ checkboxValue }}</p>
        </div>
    </UiCard>

    <!-- UiToggle -->
    <UiCard variant="outlined">
        <h2>UiToggle</h2>
        <div class="form-area">
            <UiToggle v-model="toggleValue" label="Enable notifications" />
            <UiToggle :model-value="true" label="Always on" disabled />
            <UiToggle :model-value="false" label="Always off" disabled />
            <p>Toggle value: {{ toggleValue }}</p>
        </div>
        <h3>Sizes</h3>
        <div class="row">
            <UiToggle v-model="toggleValue" size="small" label="Small" />
            <UiToggle v-model="toggleValue" size="medium" label="Medium" />
            <UiToggle v-model="toggleValue" size="large" label="Large" />
        </div>
    </UiCard>

    <!-- UiInputSelect -->
    <UiCard variant="outlined">
        <h2>UiInputSelect</h2>
        <div class="form-area">
            <UiInputSelect
                v-model="selectValue"
                label="Pick an option"
                placeholder="Select..."
                :options="selectOptions"
                required
            />
            <p>Selected: {{ selectValue || '(none)' }}</p>
        </div>
    </UiCard>
</template>

<style scoped>
.form-area {
    max-width: 400px;
}

.row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}
</style>
