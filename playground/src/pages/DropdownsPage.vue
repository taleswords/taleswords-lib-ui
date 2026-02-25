<script setup lang="ts">
import { ref } from 'vue'
import { DropdownBase, ButtonBase } from '@lib'
import type { DropdownOption } from '@lib'
import Section from '../components/Section.vue'
import Case from '../components/Case.vue'
import { definePlaygroundPage } from '../composables/usePageContract'

definePlaygroundPage({ sections: ['Variants', 'States', 'Composition', 'Accessibility'], isInteractive: true })

const basicValue = ref<string | undefined>(undefined)
const multiValue = ref<string[]>([])
const searchValue = ref<string | undefined>(undefined)
const groupedValue = ref<string | undefined>(undefined)
const iconValue = ref<string | undefined>(undefined)
const customValue = ref<string | undefined>(undefined)
const topValue = ref<string | undefined>(undefined)

const basicOptions: DropdownOption<string>[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
]

const groupedOptions: DropdownOption<string>[] = [
    { value: 'apple', label: 'Apple', groupId: 'fruits' },
    { value: 'banana', label: 'Banana', groupId: 'fruits' },
    { value: 'cherry', label: 'Cherry', groupId: 'fruits' },
    { value: 'carrot', label: 'Carrot', groupId: 'vegetables' },
    { value: 'broccoli', label: 'Broccoli', groupId: 'vegetables' },
    { value: 'spinach', label: 'Spinach', groupId: 'vegetables' },
]

const iconOptions: DropdownOption<string>[] = [
    { value: 'home', label: 'Home', icon: 'home' },
    { value: 'settings', label: 'Settings', icon: 'settings' },
    { value: 'analytics', label: 'Analytics', icon: 'bar_chart' },
    { value: 'users', label: 'Users', icon: 'group' },
]

const customOptions: DropdownOption<string>[] = [
    { value: 'user-1', label: 'Alice Johnson' },
    { value: 'user-2', label: 'Bob Smith' },
    { value: 'user-3', label: 'Carol White' },
]
</script>

<template>
    <Section title="Variants">
        <Case title="Basic Select" layout="columns">
            <DropdownBase
                v-model="basicValue"
                :options="basicOptions"
                placeholder="Choose a fruit..."
                test-id="dropdown-basic"
            />
        </Case>
        <Case title="Multi-Select with Checkboxes" layout="columns">
            <DropdownBase
                v-model="multiValue"
                :options="basicOptions"
                is-multi-select
                has-checkboxes
                has-apply-button
                has-clear-button
                placeholder="Select fruits..."
            />
        </Case>
        <Case title="Searchable" layout="columns">
            <DropdownBase
                v-model="searchValue"
                :options="basicOptions"
                has-search
                search-placeholder="Type to filter..."
                placeholder="Search fruits..."
            />
        </Case>
        <Case title="Grouped Options" layout="columns">
            <DropdownBase
                v-model="groupedValue"
                :options="groupedOptions"
                has-groups
                placeholder="Choose food..."
            />
        </Case>
        <Case title="Options with Icons" layout="columns">
            <DropdownBase
                v-model="iconValue"
                :options="iconOptions"
                placeholder="Choose a section..."
            />
        </Case>
        <Case title="Placement Top" layout="columns">
            <DropdownBase
                v-model="topValue"
                :options="basicOptions"
                placement="top-start"
                placeholder="Opens upward..."
            />
        </Case>
    </Section>

    <Section title="States">
        <Case title="Disabled" layout="columns">
            <DropdownBase
                :options="basicOptions"
                placeholder="Disabled..."
                is-disabled
            />
        </Case>
        <Case title="Error" layout="columns">
            <DropdownBase
                :options="basicOptions"
                placeholder="Error state..."
                has-error
            />
        </Case>
    </Section>

    <Section title="Composition">
        <Case title="Custom Trigger and Option Slots" layout="columns">
            <DropdownBase
                v-model="customValue"
                :options="customOptions"
                placeholder="Select user..."
                test-id="dropdown-custom"
            >
                <template #trigger="{ selectedLabel, isOpen, toggle }">
                    <ButtonBase
                        :variant="isOpen ? 'primary' : 'secondary'"
                        :label="selectedLabel || 'Pick a user'"
                        icon="person"
                        @click="toggle"
                    />
                </template>
                <template #option="{ option, isSelected }">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--button-primary-bg); color: var(--button-primary-text); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;">{{ option.label.charAt(0) }}</span>
                        <span :style="{ fontWeight: isSelected ? '700' : '400' }">{{ option.label }}</span>
                    </div>
                </template>
            </DropdownBase>
        </Case>
    </Section>

    <Section title="Accessibility">
        <Case title="Keyboard Navigation" layout="columns">
            <p>Tab to focus trigger, Enter/Space to open. Arrow keys navigate options. Enter selects. Escape closes. Multi-select uses checkboxes for screen reader clarity.</p>
        </Case>
    </Section>
</template>
