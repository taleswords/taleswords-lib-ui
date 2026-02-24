<script setup lang="ts">
import { ref } from 'vue'
import { TextboxBase, FormField } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const textValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const numberValue = ref('')
const searchValue = ref('')
const disabledValue = ref('Cannot edit this')
const readonlyValue = ref('Read-only content')
const errorValue = ref('Bad input')
const maxlengthValue = ref('')
</script>

<template>
    <Section title="Variants">
        <Case title="Text Types" layout="columns">
            <FormField label="Text">
                <TextboxBase v-model="textValue" placeholder="Enter text..." />
            </FormField>
            <FormField label="Email">
                <TextboxBase v-model="emailValue" type="email" placeholder="user@example.com" />
            </FormField>
            <FormField label="Password">
                <TextboxBase v-model="passwordValue" type="password" placeholder="Enter password..." />
            </FormField>
            <FormField label="Number">
                <TextboxBase v-model="numberValue" type="number" placeholder="0" />
            </FormField>
            <FormField label="Search">
                <TextboxBase v-model="searchValue" type="search" placeholder="Search..." />
            </FormField>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled" layout="columns">
            <FormField label="Disabled">
                <TextboxBase v-model="disabledValue" is-disabled />
            </FormField>
        </Case>
        <Case title="Readonly" layout="columns">
            <FormField label="Readonly">
                <TextboxBase v-model="readonlyValue" is-readonly />
            </FormField>
        </Case>
        <Case title="Error" layout="columns">
            <FormField
                label="With Error"
                :validation-data="{ hasError: true, message: 'This field is required' }"
            >
                <TextboxBase v-model="errorValue" has-error />
            </FormField>
        </Case>
        <Case title="Maxlength" layout="columns">
            <FormField label="Max 20 characters" :description="`${maxlengthValue.length}/20`">
                <TextboxBase v-model="maxlengthValue" :maxlength="20" placeholder="Type up to 20 chars..." />
            </FormField>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab to focus each field. Error states are announced via aria-describedby. Disabled fields are skipped in tab order.</p>
        </Case>
    </Section>
</template>
