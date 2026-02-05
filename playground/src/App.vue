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
    UiTextarea,
    UiTabs,
    UiTooltip,
    UiLoader,
    UiPagination,
    UiDropdownMenu,
    UiAlert,
} from '@lib'
import type { UiButtonProps, UiBadgeValue } from '@lib'

// Dark theme
const isDark = ref(false)
function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : '')
}

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

// Textarea
const textareaValue = ref('')

// Tabs
const activeTab = ref('tab1')

// Pagination
const currentPage = ref(1)

// Dropdown
const lastAction = ref('')

// Alert
const showDismissibleAlert = ref(true)
</script>

<template>
    <main class="playground">
        <div class="playground__header">
            <h1>UI Library Playground</h1>
            <UiButton variant="default" @click="toggleTheme">
                {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </UiButton>
        </div>

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
                    <a href="#" class="secondary">Secondary link</a> &mdash;
                    <a href="#" class="external">External link<i class="icon-link-ext" /></a>
                </p>
                <label>Label</label>
                <label class="required">Required label</label>
                <span class="error-text">Error text</span>
                <span class="info-text">Info text</span>
            </UiCard>
        </UiCard>

        <!-- Icons -->
        <UiCard variant="outlined">
            <h2>Icons</h2>
            <div class="icons-grid">
                <span class="icon-demo"><i class="icon-cancel"></i> cancel</span>
                <span class="icon-demo"><i class="icon-ok"></i> ok</span>
                <span class="icon-demo"><i class="icon-plus"></i> plus</span>
                <span class="icon-demo"><i class="icon-edit"></i> edit</span>
                <span class="icon-demo"><i class="icon-pencil"></i> pencil</span>
                <span class="icon-demo"><i class="icon-trash-empty"></i> trash-empty</span>
                <span class="icon-demo"><i class="icon-search"></i> search</span>
                <span class="icon-demo"><i class="icon-cog"></i> cog</span>
                <span class="icon-demo"><i class="icon-login"></i> login</span>
                <span class="icon-demo"><i class="icon-logout"></i> logout</span>
                <span class="icon-demo"><i class="icon-users"></i> users</span>
                <span class="icon-demo"><i class="icon-user-plus"></i> user-plus</span>
                <span class="icon-demo"><i class="icon-user-times"></i> user-times</span>
                <span class="icon-demo"><i class="icon-globe"></i> globe</span>
                <span class="icon-demo"><i class="icon-link-ext"></i> link-ext</span>
                <span class="icon-demo"><i class="icon-info-circled"></i> info-circled</span>
                <span class="icon-demo"><i class="icon-attention"></i> attention</span>
                <span class="icon-demo"><i class="icon-attention-circled"></i> attention-circled</span>
                <span class="icon-demo"><i class="icon-help-circled"></i> help-circled</span>
                <span class="icon-demo"><i class="icon-ok-circled2"></i> ok-circled2</span>
                <span class="icon-demo"><i class="icon-cancel-circled2"></i> cancel-circled2</span>
                <span class="icon-demo"><i class="icon-question-circle-o"></i> question-circle-o</span>
                <span class="icon-demo"><i class="icon-down-dir"></i> down-dir</span>
                <span class="icon-demo"><i class="icon-up-dir"></i> up-dir</span>
                <span class="icon-demo"><i class="icon-left"></i> left</span>
                <span class="icon-demo"><i class="icon-right"></i> right</span>
                <span class="icon-demo"><i class="icon-level-up"></i> level-up</span>
                <span class="icon-demo"><i class="icon-level-down"></i> level-down</span>
                <span class="icon-demo"><i class="icon-plus-squared"></i> plus-squared</span>
                <span class="icon-demo"><i class="icon-minus-squared"></i> minus-squared</span>
                <span class="icon-demo"><i class="icon-ok-squared"></i> ok-squared</span>
                <span class="icon-demo"><i class="icon-dot-circled"></i> dot-circled</span>
                <span class="icon-demo"><i class="icon-toggle-on"></i> toggle-on</span>
                <span class="icon-demo"><i class="icon-toggle-off"></i> toggle-off</span>
                <span class="icon-demo"><i class="icon-cubes"></i> cubes</span>
                <span class="icon-demo"><i class="icon-diamond"></i> diamond</span>
                <span class="icon-demo"><i class="icon-dollar"></i> dollar</span>
                <span class="icon-demo"><i class="icon-apple"></i> apple</span>
                <span class="icon-demo"><i class="icon-android"></i> android</span>
            </div>
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

        <!-- UiTabs -->
        <UiCard variant="outlined">
            <h2>UiTabs</h2>
            <UiTabs
                v-model="activeTab"
                :items="[
                    { key: 'tab1', label: 'Overview' },
                    { key: 'tab2', label: 'Details' },
                    { key: 'tab3', label: 'Disabled', disabled: true },
                    { key: 'tab4', label: 'Settings' },
                ]"
            >
                <div v-if="activeTab === 'tab1'">
                    <p>Overview content goes here.</p>
                </div>
                <div v-else-if="activeTab === 'tab2'">
                    <p>Details content with more information.</p>
                </div>
                <div v-else-if="activeTab === 'tab4'">
                    <p>Settings panel content.</p>
                </div>
            </UiTabs>
        </UiCard>

        <!-- UiTooltip -->
        <UiCard variant="outlined">
            <h2>UiTooltip</h2>
            <div class="row">
                <UiTooltip text="Top tooltip" position="top">
                    <UiButton variant="default" size="small">Top</UiButton>
                </UiTooltip>
                <UiTooltip text="Bottom tooltip" position="bottom">
                    <UiButton variant="default" size="small">Bottom</UiButton>
                </UiTooltip>
                <UiTooltip text="Left tooltip" position="left">
                    <UiButton variant="default" size="small">Left</UiButton>
                </UiTooltip>
                <UiTooltip text="Right tooltip" position="right">
                    <UiButton variant="default" size="small">Right</UiButton>
                </UiTooltip>
            </div>
        </UiCard>

        <!-- UiLoader -->
        <UiCard variant="outlined">
            <h2>UiLoader</h2>
            <div class="row">
                <UiLoader size="small" />
                <UiLoader size="medium" />
                <UiLoader size="large" />
                <UiLoader variant="dots" size="small" />
                <UiLoader variant="dots" size="medium" />
                <UiLoader variant="dots" size="large" />
            </div>
            <UiLoader size="medium" label="Loading data..." />
            <div style="position: relative; height: 100px; border: 1px dashed var(--ui-card-border-color); border-radius: 6px;">
                <UiLoader overlay label="Loading..." />
            </div>
        </UiCard>

        <!-- UiPagination -->
        <UiCard variant="outlined">
            <h2>UiPagination</h2>
            <UiPagination v-model="currentPage" :total-pages="20" :max-visible="5" />
            <p>Current page: {{ currentPage }}</p>
        </UiCard>

        <!-- UiDropdownMenu -->
        <UiCard variant="outlined">
            <h2>UiDropdownMenu</h2>
            <div class="row">
                <UiDropdownMenu
                    :items="[
                        { label: 'Edit', action: 'edit' },
                        { label: 'Duplicate', action: 'duplicate' },
                        { label: 'Archive', action: 'archive', disabled: true },
                        { label: 'Delete', action: 'delete', variant: 'danger' },
                    ]"
                    @action="lastAction = $event"
                >
                    <UiButton variant="default" size="small">Actions</UiButton>
                </UiDropdownMenu>
                <UiDropdownMenu
                    align="right"
                    :items="[
                        { label: 'Profile', action: 'profile' },
                        { label: 'Settings', action: 'settings' },
                        { label: 'Logout', action: 'logout', variant: 'danger' },
                    ]"
                    @action="lastAction = $event"
                >
                    <UiButton variant="primary" size="small">Right-aligned</UiButton>
                </UiDropdownMenu>
            </div>
            <p v-if="lastAction">Last action: {{ lastAction }}</p>
        </UiCard>

        <!-- UiAlert -->
        <UiCard variant="outlined">
            <h2>UiAlert</h2>
            <UiAlert type="info" message="This is an informational alert." />
            <UiAlert type="success" message="Operation completed successfully!" />
            <UiAlert type="warning" message="Please review the changes before continuing." />
            <UiAlert type="error" message="An error occurred while processing your request." />
            <UiAlert
                v-if="showDismissibleAlert"
                type="info"
                message="This alert can be dismissed."
                dismissible
                @dismiss="showDismissibleAlert = false"
            >
                <p style="margin: 0.5em 0 0; font-size: 0.875em;">Additional details can go in the slot.</p>
            </UiAlert>
            <UiButton
                v-if="!showDismissibleAlert"
                size="small"
                @click="showDismissibleAlert = true"
            >Show Dismissible Alert</UiButton>
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

.playground__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.playground__header h1 {
    margin: 0;
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

.icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
}

.icon-demo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.icon-demo i {
    font-size: 1.25rem;
}
</style>
