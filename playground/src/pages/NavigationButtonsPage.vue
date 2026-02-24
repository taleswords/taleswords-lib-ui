<script setup lang="ts">
import { ref } from 'vue'
import { NavigationButtons, CardBase } from '@lib'
import type { NavItem } from '@lib'

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
    <div class="page" data-testid="page-nav-buttons">
        <h1>Navigation Buttons</h1>

        <CardBase title="Basic">
            <div class="nav-container">
                <NavigationButtons
                    :items="basicItems"
                    :active-id="activeId"
                    @item-clicked="(item) => activeId = item.id"
                />
            </div>
            <p class="demo-value">Active: {{ activeId }}</p>
        </CardBase>

        <CardBase title="With Icons">
            <div class="nav-container">
                <NavigationButtons
                    :items="iconItems"
                    :active-id="iconActiveId"
                    @item-clicked="(item) => iconActiveId = item.id"
                />
            </div>
        </CardBase>

        <CardBase title="Disabled Item">
            <div class="nav-container">
                <NavigationButtons
                    :items="disabledItems"
                    :active-id="disabledActiveId"
                    @item-clicked="(item) => disabledActiveId = item.id"
                />
            </div>
        </CardBase>

        <CardBase title="With Links">
            <div class="nav-container">
                <NavigationButtons :items="linkItems" />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.nav-container {
    max-width: 240px;
}

.demo-value {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}
</style>
