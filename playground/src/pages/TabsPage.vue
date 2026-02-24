<script setup lang="ts">
import { ref } from 'vue'
import { TabsBase, ButtonBase, CardBase } from '@lib'
import type { TabItem } from '@lib'

const activeTab = ref('overview')
const controlledTab = ref('tab-a')

const basicTabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
]

const iconTabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: 'icon-home' },
    { id: 'profile', label: 'Profile', icon: 'icon-user' },
    { id: 'messages', label: 'Messages', icon: 'icon-chat' },
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
    <div class="page" data-testid="page-tabs">
        <h1>Tabs</h1>

        <CardBase title="Basic Tabs">
            <TabsBase v-model="activeTab" :tabs="basicTabs">
                <template #default="{ activeTab: current }">
                    <div class="tab-content">
                        <p v-if="current === 'overview'">Overview content goes here.</p>
                        <p v-else-if="current === 'details'">Details content with more information.</p>
                        <p v-else>Settings panel for configuration.</p>
                    </div>
                </template>
            </TabsBase>
        </CardBase>

        <CardBase title="Tabs with Icons">
            <TabsBase v-model="iconActiveTab" :tabs="iconTabs">
                <template #default="{ activeTab: current }">
                    <div class="tab-content">
                        <p>Currently viewing: {{ current }}</p>
                    </div>
                </template>
            </TabsBase>
        </CardBase>

        <CardBase title="Disabled Tab">
            <TabsBase v-model="disabledActiveTab" :tabs="disabledTabs">
                <template #default="{ activeTab: current }">
                    <div class="tab-content">
                        <p>Active: {{ current }}</p>
                    </div>
                </template>
            </TabsBase>
        </CardBase>

        <CardBase title="Controlled Externally">
            <div class="demo-row" style="margin-bottom: 1rem;">
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
                    <div class="tab-content">
                        <p>Content of {{ current }}. Use the buttons above to switch tabs externally.</p>
                    </div>
                </template>
            </TabsBase>
        </CardBase>
    </div>
</template>

<style scoped>
.tab-content {
    padding: 1rem 0;
}

.demo-row {
    display: flex;
    gap: 0.5rem;
}
</style>
