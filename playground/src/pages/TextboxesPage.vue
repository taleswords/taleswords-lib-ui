<script setup lang="ts">
import { ref } from 'vue'
import { TextboxBase, FormField, CardBase } from '@lib'

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
    <div class="page" data-testid="page-textboxes">
        <h1>Textboxes</h1>

        <CardBase title="Types">
            <div class="demo-grid">
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
            </div>
        </CardBase>

        <CardBase title="States">
            <div class="demo-grid">
                <FormField label="Disabled">
                    <TextboxBase v-model="disabledValue" is-disabled />
                </FormField>
                <FormField label="Readonly">
                    <TextboxBase v-model="readonlyValue" is-readonly />
                </FormField>
                <FormField
                    label="With Error"
                    :validation-data="{ hasError: true, message: 'This field is required' }"
                >
                    <TextboxBase v-model="errorValue" has-error />
                </FormField>
            </div>
        </CardBase>

        <CardBase title="Maxlength">
            <FormField label="Max 20 characters" :description="`${maxlengthValue.length}/20`">
                <TextboxBase v-model="maxlengthValue" :maxlength="20" placeholder="Type up to 20 chars..." />
            </FormField>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}
</style>
