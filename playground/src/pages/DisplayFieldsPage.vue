<script setup lang="ts">
import { DisplayFieldBase, BadgeBase } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Density'] })
</script>

<template>
    <Section title="Variants">
        <Case title="Vertical (default)" layout="columns">
            <DisplayFieldBase label="Name" value="Alice Whitmore" />
            <DisplayFieldBase label="Email" value="alice@example.com" />
            <DisplayFieldBase label="Member since" :value="2024" />
        </Case>
        <Case title="Inline" layout="columns">
            <DisplayFieldBase label="Status" value="Active" inline />
            <DisplayFieldBase label="Role" value="Editor" inline />
            <DisplayFieldBase label="Items" :value="38" inline />
        </Case>
    </Section>

    <Section title="States">
        <Case title="Muted" layout="columns">
            <DisplayFieldBase label="Last login" value="Never" is-muted />
            <DisplayFieldBase label="Notes" value="No notes available" is-muted />
        </Case>
        <Case title="Truncated" layout="columns">
            <div style="max-width: 200px">
                <DisplayFieldBase
                    label="File path"
                    value="/home/user/documents/projects/taleswords/assets/images/cover-art-final-v3.png"
                    truncate
                />
            </div>
        </Case>
        <Case title="Empty value" layout="columns">
            <DisplayFieldBase label="Description" />
            <DisplayFieldBase label="Assignee" :value="null" />
        </Case>
    </Section>

    <Section title="Composition">
        <Case title="Slot override" layout="columns">
            <DisplayFieldBase label="Role">
                <BadgeBase variant="editor" />
            </DisplayFieldBase>
            <DisplayFieldBase label="Visibility">
                <BadgeBase variant="public" />
            </DisplayFieldBase>
        </Case>
    </Section>

    <Section title="Density">
        <Case title="Compact" layout="columns">
            <div data-density="compact">
                <DisplayFieldBase label="Name" value="Alice Whitmore" />
                <DisplayFieldBase label="Email" value="alice@example.com" />
            </div>
        </Case>
    </Section>
</template>
