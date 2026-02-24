<script setup lang="ts">
import { ref } from 'vue'
import { NavigationButtons } from '@lib'
import type { NavItem } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Accessibility'], isInteractive: true })

const activeId = ref('dashboard')

const basicItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'settings', label: 'Settings' },
    { id: 'help', label: 'Help' },
]

const iconItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'users', label: 'Users', icon: 'group' },
    { id: 'files', label: 'Files', icon: 'description' },
    { id: 'config', label: 'Config', icon: 'settings' },
]

const disabledItems: NavItem[] = [
    { id: 'active-item', label: 'Active' },
    { id: 'disabled-item', label: 'Disabled', isDisabled: true },
    { id: 'another-item', label: 'Another' },
]

const linkItems: NavItem[] = [
    { id: 'docs', label: 'Documentation', href: '#' },
    { id: 'api', label: 'API Reference', href: '#' },
    { id: 'changelog', label: 'Changelog', href: '#' },
]

const iconActiveId = ref('home')
const disabledActiveId = ref('active-item')
</script>

<template>
    <Section title="Variants">
        <Case title="Basic" layout="columns">
            <div style="max-width: 240px;">
                <NavigationButtons
                    :items="basicItems"
                    :active-id="activeId"
                    @item-clicked="(item) => activeId = item.id"
                />
            </div>
        </Case>
        <Case title="With Icons" layout="columns">
            <div style="max-width: 240px;">
                <NavigationButtons
                    :items="iconItems"
                    :active-id="iconActiveId"
                    @item-clicked="(item) => iconActiveId = item.id"
                />
            </div>
        </Case>
        <Case title="With Links" layout="columns">
            <div style="max-width: 240px;">
                <NavigationButtons :items="linkItems" />
            </div>
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled Item" layout="columns">
            <div style="max-width: 240px;">
                <NavigationButtons
                    :items="disabledItems"
                    :active-id="disabledActiveId"
                    @item-clicked="(item) => disabledActiveId = item.id"
                />
            </div>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab navigates between buttons. Enter/Space activates. Active item is visually distinguished. Disabled items are not focusable.</p>
        </Case>
    </Section>
</template>
