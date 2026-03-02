<script setup lang="ts">
import { ButtonBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'Sizes', 'Density'], isInteractive: true })
</script>

<template>
    <Section title="Variants">
        <Case title="All Variants" layout="row">
            <ButtonBase variant="default" label="Default" />
            <ButtonBase variant="primary" label="Primary" />
            <ButtonBase variant="secondary" label="Secondary" />
            <ButtonBase variant="danger" label="Danger" />
            <ButtonBase variant="ghost" label="Ghost" />
            <ButtonBase variant="ghost-primary" label="Ghost Primary" />
            <ButtonBase variant="ghost-danger" label="Ghost Danger" />
        </Case>
    </Section>

    <Section title="Sizes">
        <Case title="Size Comparison" layout="row">
            <ButtonBase variant="primary" size="small" label="Small" />
            <ButtonBase variant="primary" size="medium" label="Medium" />
        </Case>
    </Section>

    <Section title="With Icons">
        <Case title="Icon Buttons" layout="row">
            <ButtonBase variant="primary" icon="add" label="Add Item" />
            <ButtonBase variant="secondary" icon="download" icon-position="right" label="Download" />
            <ButtonBase variant="danger" icon="delete" label="Delete" />
            <ButtonBase variant="ghost" icon="settings" />
            <ButtonBase variant="ghost-primary" icon="edit" label="Edit" />
        </Case>
    </Section>

    <Section title="Icon-Only Buttons">
        <Case title="Icon Only" layout="row">
            <ButtonBase variant="default" icon="search" />
            <ButtonBase variant="primary" icon="add" />
            <ButtonBase variant="secondary" icon="edit" />
            <ButtonBase variant="danger" icon="delete" />
            <ButtonBase variant="ghost" icon="more_vert" />
            <ButtonBase variant="ghost" icon="close" />
        </Case>
    </Section>

    <Section title="Small with Icons">
        <Case title="Small Icon Buttons" layout="row">
            <ButtonBase variant="primary" size="small" icon="save" label="Save" />
            <ButtonBase variant="secondary" size="small" icon="content_copy" label="Copy" />
            <ButtonBase variant="ghost" size="small" icon="refresh" />
        </Case>
    </Section>

    <Section title="Disabled">
        <Case title="Disabled States" layout="row">
            <ButtonBase variant="primary" label="Primary" is-disabled />
            <ButtonBase variant="secondary" label="Secondary" is-disabled />
            <ButtonBase variant="danger" label="Danger" is-disabled />
            <ButtonBase variant="ghost" label="Ghost" is-disabled />
        </Case>
    </Section>

    <Section title="As Link">
        <Case title="Link Button" layout="row">
            <ButtonBase variant="primary" label="External Link" href="#" />
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="row">
            <div data-density="compact" style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <ButtonBase variant="primary" label="Primary" />
                <ButtonBase variant="secondary" label="Secondary" />
                <ButtonBase variant="primary" size="small" label="Small" />
                <ButtonBase variant="danger" icon="delete" label="Delete" />
                <ButtonBase variant="ghost" icon="settings" />
            </div>
        </Case>
    </Section>
</template>
