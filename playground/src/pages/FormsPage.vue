<script setup lang="ts">
import { ref } from 'vue'
import { FormField, TextboxBase, CheckboxBase, DropdownBase, CardBase } from '@lib'
import type { DropdownOption } from '@lib'

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
    <div class="page" data-testid="page-forms">
        <h1>Form Fields</h1>

        <CardBase title="Basic Fields">
            <div class="demo-stack">
                <FormField label="Full Name" description="Enter your first and last name">
                    <TextboxBase v-model="name" placeholder="John Doe" />
                </FormField>
                <FormField label="Email Address">
                    <TextboxBase v-model="email" type="email" placeholder="john@example.com" />
                </FormField>
                <FormField label="Role">
                    <DropdownBase v-model="role" :options="roleOptions" placeholder="Select role..." />
                </FormField>
            </div>
        </CardBase>

        <CardBase title="Optional Field">
            <FormField label="Nickname" is-optional>
                <TextboxBase placeholder="Optional nickname..." />
            </FormField>
        </CardBase>

        <CardBase title="With Validation Errors">
            <div class="demo-stack">
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
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
