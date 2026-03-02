<script setup lang="ts">
import { ref } from 'vue'
import { LoaderIcon, LoaderBase, CardBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Density'] })

const showOverlay = ref(false)
</script>

<template>
    <Section title="Variants">
        <Case title="LoaderIcon Sizes" layout="row">
            <LoaderIcon size="small" />
            <LoaderIcon size="medium" />
            <LoaderIcon size="large" />
        </Case>
        <Case title="Spinner" layout="row">
            <LoaderBase variant="spinner" size="small" label="Loading..." />
            <LoaderBase variant="spinner" size="medium" label="Loading..." />
            <LoaderBase variant="spinner" size="large" label="Loading..." />
        </Case>
        <Case title="Dots" layout="row">
            <LoaderBase variant="dots" size="small" label="Loading..." />
            <LoaderBase variant="dots" size="medium" label="Loading..." />
            <LoaderBase variant="dots" size="large" label="Loading..." />
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Overlay" layout="columns">
            <CardBase :is-loading="showOverlay" @click="showOverlay = !showOverlay">
                <p>Click this card to toggle the loader overlay. Content remains underneath.</p>
                <p>Overlay is currently {{ showOverlay ? 'visible' : 'hidden' }}.</p>
            </CardBase>
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="row">
            <div data-density="compact" style="display: flex; gap: 1rem; align-items: center;">
                <LoaderBase variant="spinner" size="medium" label="Loading..." />
                <LoaderBase variant="dots" size="medium" label="Loading..." />
            </div>
        </Case>
    </Section>
</template>
