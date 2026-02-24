<script setup lang="ts">
import { ref } from 'vue'
import { ProgressBar, ButtonBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const dynamicValue = ref(45)

function randomize(): void {
    dynamicValue.value = Math.floor(Math.random() * 101)
}
</script>

<template>
    <Section title="Variants">
        <Case title="Color Variants" layout="columns">
            <ProgressBar :value="25" variant="default" />
            <ProgressBar :value="50" variant="success" />
            <ProgressBar :value="75" variant="warning" />
            <ProgressBar :value="100" variant="danger" />
        </Case>
        <Case title="With Labels" layout="columns">
            <ProgressBar :value="33" show-label />
            <ProgressBar :value="66" variant="success" show-label />
            <ProgressBar :value="100" variant="danger" show-label />
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Interactive Value" layout="columns">
            <ProgressBar :value="dynamicValue" variant="success" show-label />
            <ButtonBase variant="secondary" size="small" label="Randomize" @click="randomize" />
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Aria Label" layout="columns">
            <ProgressBar :value="60" aria-label="File upload progress" show-label />
            <p>Custom aria-label for screen readers: "File upload progress".</p>
        </Case>
    </Section>
</template>
