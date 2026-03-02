<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Sizes', 'States', 'Density', 'Accessibility'], isInteractive: true })

const sm = ref(false)
const md = ref(true)
const lg = ref(false)
const disabledOff = ref(false)
const disabledOn = ref(true)
</script>

<template>
    <Section title="Sizes">
        <Case title="All Sizes" layout="columns">
            <Switch v-model="sm" size="small" label="Small switch" />
            <Switch v-model="md" size="medium" label="Medium switch" />
            <Switch v-model="lg" size="large" label="Large switch" />
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled" layout="columns">
            <Switch v-model="disabledOff" label="Disabled (off)" is-disabled />
            <Switch v-model="disabledOn" label="Disabled (on)" is-disabled />
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="columns">
            <div data-density="compact" style="display: flex; align-items: center; gap: var(--space-sm);">
                <Switch :model-value="true" size="medium" label="Compact switch" />
                <Switch :model-value="false" size="small" label="Compact small" />
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab to focus, Space to toggle. The switch role is announced by screen readers. Disabled switches are skipped in tab order.</p>
        </Case>
    </Section>
</template>
