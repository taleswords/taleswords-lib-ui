<script setup lang="ts">
import { ref } from 'vue'
import { DropdownBase, ButtonBase, CardBase } from '@lib'
import type { DropdownOption } from '@lib'

const basicValue = ref<string | undefined>(undefined)
const multiValue = ref<string[]>([])
const searchValue = ref<string | undefined>(undefined)
const groupedValue = ref<string | undefined>(undefined)
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

const customOptions: DropdownOption<string>[] = [
    { value: 'user-1', label: 'Alice Johnson' },
    { value: 'user-2', label: 'Bob Smith' },
    { value: 'user-3', label: 'Carol White' },
]
</script>

<template>
    <div class="page" data-testid="page-dropdowns">
        <h1>Dropdowns</h1>

        <CardBase title="Basic Select">
            <DropdownBase
                v-model="basicValue"
                :options="basicOptions"
                placeholder="Choose a fruit..."
                test-id="dropdown-basic"
            />
            <p class="demo-value">Selected: {{ basicValue ?? 'none' }}</p>
        </CardBase>

        <CardBase title="Multi-Select with Checkboxes">
            <DropdownBase
                v-model="multiValue"
                :options="basicOptions"
                is-multi-select
                has-checkboxes
                has-apply-button
                has-clear-button
                placeholder="Select fruits..."
            />
            <p class="demo-value">Selected: {{ multiValue.length ? multiValue.join(', ') : 'none' }}</p>
        </CardBase>

        <CardBase title="Searchable">
            <DropdownBase
                v-model="searchValue"
                :options="basicOptions"
                has-search
                search-placeholder="Type to filter..."
                placeholder="Search fruits..."
            />
        </CardBase>

        <CardBase title="Grouped Options">
            <DropdownBase
                v-model="groupedValue"
                :options="groupedOptions"
                has-groups
                placeholder="Choose food..."
            />
        </CardBase>

        <CardBase title="Custom Slots">
            <DropdownBase
                v-model="customValue"
                :options="customOptions"
                placeholder="Select user..."
                test-id="dropdown-custom"
            >
                <template #trigger="{ selectedLabel, isOpen }">
                    <ButtonBase
                        :variant="isOpen ? 'primary' : 'secondary'"
                        :label="selectedLabel || 'Pick a user'"
                        icon="icon-user"
                    />
                </template>
                <template #option="{ option, isSelected }">
                    <div class="custom-option">
                        <span class="custom-option__avatar">{{ option.label.charAt(0) }}</span>
                        <span :style="{ fontWeight: isSelected ? '700' : '400' }">{{ option.label }}</span>
                    </div>
                </template>
            </DropdownBase>
        </CardBase>

        <CardBase title="States">
            <div class="demo-row">
                <DropdownBase
                    :options="basicOptions"
                    placeholder="Disabled..."
                    is-disabled
                />
                <DropdownBase
                    :options="basicOptions"
                    placeholder="Error state..."
                    has-error
                />
            </div>
        </CardBase>

        <CardBase title="Placement: Top">
            <DropdownBase
                v-model="topValue"
                :options="basicOptions"
                placement="top-start"
                placeholder="Opens upward..."
            />
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.demo-value {
    margin-top: 0.5rem;
    font-size: 0.8125rem;
    color: var(--form-field-description-color);
}

.custom-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.custom-option__avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
}
</style>
