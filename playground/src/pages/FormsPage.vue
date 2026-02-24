<script setup lang="ts">
import { ref } from 'vue'
import { FormField, TextboxBase, CheckboxBase, DropdownBase } from '@lib'
import type { DropdownOption } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

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

    <Section title="Accessibility">
        <Case title="Label Association" layout="columns">
            <p>Each FormField associates its label with the input via aria attributes. Validation errors are announced via aria-describedby. Required fields use aria-required.</p>
        </Case>
    </Section>
</template>
