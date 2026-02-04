<script setup lang="ts">
import { ref } from 'vue'
import {
    UiButton,
    UiBadge,
    UiModal,
    UiPopover,
    UiInputField,
    UiCheckboxField,
    UiInputSelect,
    UiUserIcon,
    UiBreadcrumbs,
    UiActionsHeader,
    UiCard,
} from '@lib'
import type { UiButtonProps, UiBadgeValue } from '@lib'

// Button
const btnDisabled = ref(false)
const btnVariant = ref<UiButtonProps['variant']>('default')

// Badge
const badgeValues: UiBadgeValue[] = [
    'visitor', 'guest', 'guest-editor', 'reviewer', 'editor',
    'manager', 'admin', 'owner', 'public', 'private',
    'pending', 'declined', 'accepted',
]

// Modal
const showModal = ref(false)
const modalError = ref('')
const modalWarning = ref('')

// Popover
const showPopover = ref(false)
const popoverType = ref<'success' | 'error'>('success')
const popoverMessage = ref('Action completed successfully!')

// Input field
const inputValue = ref('')
const inputError = ref('')
const inputDisabled = ref(false)

// Checkbox
const checkboxValue = ref(false)

// Input select
const selectValue = ref('')
const selectOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
    { label: 'Option D', value: 'd' },
]

// User icons
const userNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward']

// Breadcrumbs
const breadcrumbs = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Current Project' },
]
</script>

<template>
    <main class="playground">
        <h1>UI Library Playground</h1>

        <!-- Typography -->
        <UiCard variant="outlined">
            <h2>Typography</h2>
            <UiCard>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <p>Body text in Lora serif. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Second paragraph for spacing. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>
                    <a href="#">Primary link</a> &mdash;
                    <a href="#" class="secondary">Secondary link</a>
                </p>
                <label>Label</label>
                <label class="required">Required label</label>
                <span class="error-text">Error text</span>
                <span class="info-text">Info text</span>
            </UiCard>
        </UiCard>

        <!-- UiCard -->
        <UiCard variant="outlined">
            <h2>UiCard</h2>
            <div class="row">
                <UiCard>Default</UiCard>
                <UiCard variant="elevated">Elevated</UiCard>
                <UiCard variant="outlined">Outlined</UiCard>
            </div>
        </UiCard>

        <!-- UiButton -->
        <UiCard variant="outlined">
            <h2>UiButton</h2>
            <UiCard row>
                <label><input type="checkbox" v-model="btnDisabled" /> Disabled</label>
                <select v-model="btnVariant">
                    <option value="default">Default</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="danger">Danger</option>
                </select>
                <UiButton :disabled="btnDisabled" :variant="btnVariant">Click me</UiButton>
            </UiCard>
            <h3>All Variants</h3>
            <div class="row">
                <UiButton variant="default">Default</UiButton>
                <UiButton variant="primary">Primary</UiButton>
                <UiButton variant="secondary">Secondary</UiButton>
                <UiButton variant="danger">Danger</UiButton>
            </div>
            <h3>Small Size</h3>
            <div class="row">
                <UiButton variant="default" size="small">Default</UiButton>
                <UiButton variant="primary" size="small">Primary</UiButton>
                <UiButton variant="secondary" size="small">Secondary</UiButton>
                <UiButton variant="danger" size="small">Danger</UiButton>
            </div>
            <h3>Disabled</h3>
            <div class="row">
                <UiButton variant="default" disabled>Default</UiButton>
                <UiButton variant="primary" disabled>Primary</UiButton>
                <UiButton variant="secondary" disabled>Secondary</UiButton>
                <UiButton variant="danger" disabled>Danger</UiButton>
            </div>
        </UiCard>

        <!-- UiBadge -->
        <UiCard variant="outlined">
            <h2>UiBadge</h2>
            <div class="row">
                <UiBadge v-for="v in badgeValues" :key="v" :value="v" />
            </div>
        </UiCard>

        <!-- UiUserIcon -->
        <UiCard variant="outlined">
            <h2>UiUserIcon</h2>
            <div class="row">
                <span v-for="name in userNames" :key="name" class="user-icon-demo">
                    <UiUserIcon :name="name" />
                    <span>{{ name }}</span>
                </span>
            </div>
        </UiCard>

        <!-- UiBreadcrumbs -->
        <UiCard variant="outlined">
            <h2>UiBreadcrumbs</h2>
            <UiBreadcrumbs :items="breadcrumbs" />
        </UiCard>

        <!-- UiActionsHeader -->
        <UiCard variant="outlined">
            <h2>UiActionsHeader</h2>
            <UiActionsHeader title="Section Title">
                <UiButton variant="primary" size="small">Action</UiButton>
            </UiActionsHeader>
            <UiActionsHeader title="Another Header" />
        </UiCard>

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

        <!-- UiModal -->
        <UiCard variant="outlined">
            <h2>UiModal</h2>
            <UiCard row>
                <UiButton variant="primary" @click="showModal = true">Open Modal</UiButton>
                <label><input type="checkbox" v-model="modalError" true-value="Something went wrong!" false-value="" /> Show Error</label>
                <label><input type="checkbox" v-model="modalWarning" true-value="Please be careful" false-value="" /> Show Warning</label>
            </UiCard>
            <UiModal
                v-if="showModal"
                title="Example Modal"
                confirm-text="Save"
                :error-text="modalError"
                :warning-text="modalWarning"
                info-text="This is informational"
                @close="showModal = false"
                @confirm="showModal = false"
                @cancel="showModal = false"
            >
                <p>This is the modal body content. You can put forms and other content here.</p>
            </UiModal>
        </UiCard>

        <!-- UiPopover -->
        <UiCard variant="outlined">
            <h2>UiPopover</h2>
            <UiCard row>
                <UiButton variant="primary" @click="popoverType = 'success'; popoverMessage = 'Action completed successfully!'; showPopover = true">
                    Show Success
                </UiButton>
                <UiButton variant="danger" @click="popoverType = 'error'; popoverMessage = 'Something went wrong!'; showPopover = true">
                    Show Error
                </UiButton>
            </UiCard>
            <UiPopover
                v-if="showPopover"
                :message="popoverMessage"
                :type="popoverType"
                :duration="3000"
                @close="showPopover = false"
            />
        </UiCard>
    </main>
</template>

<style scoped>
.playground {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    padding-bottom: 6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}

.form-area {
    max-width: 400px;
}

.user-icon-demo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
