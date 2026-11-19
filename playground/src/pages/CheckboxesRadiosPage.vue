<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxBase, CheckboxInput, Radio, CardBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Density', 'Accessibility'], isInteractive: true })

const cb1 = ref(false)
const cb2 = ref(true)
const cb3 = ref(false)
const cb4 = ref(false)

const radio1 = ref('option-a')
const radio2 = ref('')
const groundRadio = ref('')
const groundCheck = ref(false)
const cardRadio = ref('')
const cardCheck = ref(false)
</script>

<template>
    <Section title="Variants">
        <Case title="CheckboxBase" layout="columns">
            <CheckboxBase v-model="cb1" label="Unchecked by default" />
            <CheckboxBase v-model="cb2" label="Checked by default" />
        </Case>
        <Case title="CheckboxInput (Visual Only)" layout="row">
            <CheckboxInput />
            <CheckboxInput is-checked />
        </Case>
        <Case title="Radio Group" layout="columns">
            <Radio v-model="radio1" value="option-a" name="demo-group" label="Option A" />
            <Radio v-model="radio1" value="option-b" name="demo-group" label="Option B" />
            <Radio v-model="radio1" value="option-c" name="demo-group" label="Option C" />
        </Case>
        <Case title="The resting ring on the page (3:1 against its ground)" layout="columns">
            <div data-testid="ring-on-page">
                <Radio v-model="groundRadio" value="a" name="ground-page" label="Unchecked radio" />
                <CheckboxBase v-model="groundCheck" label="Unchecked checkbox" />
            </div>
        </Case>
        <Case title="The resting ring on a card" layout="columns">
            <CardBase>
                <div data-testid="ring-on-card">
                    <Radio v-model="cardRadio" value="a" name="ground-card" label="Unchecked radio" />
                    <CheckboxBase v-model="cardCheck" label="Unchecked checkbox" />
                </div>
            </CardBase>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Checkbox Disabled" layout="columns">
            <CheckboxBase v-model="cb3" label="Disabled checkbox" is-disabled />
        </Case>
        <Case title="Checkbox Error" layout="columns">
            <CheckboxBase v-model="cb4" label="Error state" has-error />
        </Case>
        <Case title="CheckboxInput States" layout="row">
            <CheckboxInput is-disabled />
            <CheckboxInput is-checked is-disabled />
            <CheckboxInput has-error />
        </Case>
        <Case title="Radio Disabled" layout="columns">
            <Radio v-model="radio2" value="disabled-opt" name="state-group" label="Disabled radio" is-disabled />
        </Case>
        <Case title="Radio Error" layout="columns">
            <Radio v-model="radio2" value="error-opt" name="state-group" label="Error radio" has-error />
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="columns">
            <div data-density="compact" style="display: flex; flex-direction: column; gap: var(--space-sm);">
                <CheckboxBase :model-value="true" label="Compact checkbox" />
                <Radio model-value="option-a" value="option-a" name="compact-group" label="Compact radio" />
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab to focus checkboxes, Space to toggle. Arrow keys navigate within radio groups. Focus ring is visible on all interactive elements.</p>
        </Case>
    </Section>
</template>
