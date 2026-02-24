<script setup lang="ts">
import { ref } from 'vue'
import { TabsBase, ButtonBase } from '@lib'
import type { TabItem } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const activeTab = ref('overview')
const controlledTab = ref('tab-a')

const basicTabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
]

const iconTabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'messages', label: 'Messages', icon: 'chat' },
]

const disabledTabs: TabItem[] = [
    { id: 'active-1', label: 'Active Tab' },
    { id: 'disabled-1', label: 'Disabled Tab', isDisabled: true },
    { id: 'active-2', label: 'Another Tab' },
]

const controlledTabs: TabItem[] = [
    { id: 'tab-a', label: 'Tab A' },
    { id: 'tab-b', label: 'Tab B' },
    { id: 'tab-c', label: 'Tab C' },
]

const iconActiveTab = ref('home')
const disabledActiveTab = ref('active-1')
</script>

<template>
    <Section title="Variants" :full-width="true">
        <Case title="Basic Tabs" layout="columns">
            <TabsBase v-model="activeTab" :tabs="basicTabs">
                <template #default="{ activeTab: current }">
                    <div style="padding: 1rem 0;">
                        <p v-if="current === 'overview'">Overview content goes here.</p>
                        <p v-else-if="current === 'details'">Details content with more information.</p>
                        <p v-else>Settings panel for configuration.</p>
                    </div>
                </template>
            </TabsBase>
        </Case>
        <Case title="Tabs with Icons" layout="columns">
            <TabsBase v-model="iconActiveTab" :tabs="iconTabs">
                <template #default="{ activeTab: current }">
                    <div style="padding: 1rem 0;">
                        <p>Currently viewing: {{ current }}</p>
                    </div>
                </template>
            </TabsBase>
        </Case>
    </Section>

    <Section title="States" :full-width="true">
        <Case title="Disabled Tab" layout="columns">
            <TabsBase v-model="disabledActiveTab" :tabs="disabledTabs">
                <template #default="{ activeTab: current }">
                    <div style="padding: 1rem 0;">
                        <p>Active: {{ current }}</p>
                    </div>
                </template>
            </TabsBase>
        </Case>
        <Case title="Controlled Externally" layout="columns">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                <ButtonBase
                    v-for="tab in controlledTabs"
                    :key="tab.id"
                    :variant="controlledTab === tab.id ? 'primary' : 'secondary'"
                    size="small"
                    :label="'Go to ' + tab.label"
                    @click="controlledTab = tab.id"
                />
            </div>
            <TabsBase v-model="controlledTab" :tabs="controlledTabs">
                <template #default="{ activeTab: current }">
                    <div style="padding: 1rem 0;">
                        <p>Content of {{ current }}. Use the buttons above to switch tabs externally.</p>
                    </div>
                </template>
            </TabsBase>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Arrow keys navigate between tabs. Tab moves focus into the active panel. Disabled tabs are skipped. ARIA roles tablist, tab, and tabpanel are applied automatically.</p>
        </Case>
    </Section>
</template>
