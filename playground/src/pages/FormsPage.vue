<script setup lang="ts">
import { ref } from 'vue'
import { FormField, TextboxBase, CheckboxBase, DropdownBase, DisplayFieldBase, BadgeBase, LoaderIcon } from '@lib'
import type { DropdownOption } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Density', 'Accessibility'], isInteractive: true })

const name = ref('')
const email = ref('')
const agree = ref(false)
const role = ref<string | undefined>(undefined)

const roleOptions: DropdownOption<string>[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
]
</script>

<template>
    <Section title="Variants">
        <Case title="Basic Fields" layout="columns">
            <FormField label="Full Name" description="Enter your first and last name">
                <TextboxBase v-model="name" placeholder="John Doe" />
            </FormField>
            <FormField label="Email Address">
                <TextboxBase v-model="email" type="email" placeholder="john@example.com" />
            </FormField>
            <FormField label="Role">
                <DropdownBase v-model="role" :options="roleOptions" placeholder="Select role..." />
            </FormField>
        </Case>
        <Case title="Optional Field" layout="columns">
            <FormField label="Nickname" is-optional>
                <TextboxBase placeholder="Optional nickname..." />
            </FormField>
        </Case>
        <Case title="Display — With DisplayFieldBase" layout="columns">
            <FormField label="Full Name" display>
                <DisplayFieldBase label="" value="Jane Doe" />
            </FormField>
            <FormField label="Email Address" display>
                <DisplayFieldBase label="" value="jane@example.com" />
            </FormField>
        </Case>
        <Case title="Display — With Read-Only TextboxBase" layout="columns">
            <FormField label="Full Name" display>
                <TextboxBase model-value="Jane Doe" is-readonly />
            </FormField>
            <FormField label="Email Address" display>
                <TextboxBase model-value="jane@example.com" is-readonly />
            </FormField>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Validation Errors" layout="columns">
            <FormField
                label="Username"
                :validation-data="[
                    { hasError: true, message: 'Username is required' },
                    { hasError: true, message: 'Username must be at least 3 characters' },
                ]"
            >
                <TextboxBase model-value="" has-error placeholder="Enter username..." />
            </FormField>
            <FormField
                label="Accept Terms"
                :validation-data="{ hasError: true, message: 'You must accept the terms' }"
            >
                <CheckboxBase v-model="agree" label="I agree to the terms" has-error />
            </FormField>
        </Case>
    </Section>

    <Section title="Composition">
        <Case title="Label Suffix — Saving Spinner" layout="columns">
            <FormField label="Character Name">
                <template #label-suffix>
                    <LoaderIcon size="small" />
                </template>
                <TextboxBase placeholder="Enter name..." />
            </FormField>
        </Case>
        <Case title="Label Suffix — Status Badge" layout="columns">
            <FormField label="Pepper Analysis" display>
                <template #label-suffix>
                    <BadgeBase variant="warning" label="3 signals" size="sm" />
                </template>
                <DisplayFieldBase label="" value="Analysis complete with warnings." />
            </FormField>
        </Case>
        <Case title="Label Suffix — Character Count" layout="columns">
            <FormField label="Description" is-optional>
                <template #label-suffix>
                    <span style="font-size: 0.8125em; color: var(--form-field-description-color);">0/500</span>
                </template>
                <TextboxBase placeholder="Enter description..." />
            </FormField>
        </Case>
        <Case title="Label Suffix — Compact Density" layout="columns">
            <div data-density="compact">
                <FormField label="Field Name">
                    <template #label-suffix>
                        <LoaderIcon size="small" />
                    </template>
                    <TextboxBase placeholder="Compact density..." />
                </FormField>
            </div>
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <FormField label="Full Name" description="Compact density wrapper">
                    <TextboxBase placeholder="John Doe" />
                </FormField>
                <FormField label="Email Address">
                    <TextboxBase type="email" placeholder="john@example.com" />
                </FormField>
            </div>
        </Case>
        <Case title="Compact Display" layout="columns">
            <div data-density="compact">
                <FormField label="Full Name" display>
                    <DisplayFieldBase label="" value="Jane Doe" />
                </FormField>
                <FormField label="Role" display>
                    <DisplayFieldBase label="" value="Administrator" />
                </FormField>
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Label Association" layout="columns">
            <p>Each FormField associates its label with the input via aria attributes. Validation errors are announced via aria-describedby. Required fields use aria-required.</p>
        </Case>
    </Section>
</template>
