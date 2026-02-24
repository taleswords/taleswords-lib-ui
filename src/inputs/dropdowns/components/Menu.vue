<script setup lang="ts">
import { computed } from 'vue'

export interface DropdownMenuOption {
    value: unknown
    label: string
    isDisabled?: boolean
    icon?: string
    groupId?: string
}

export interface DropdownMenuProps {
    options: DropdownMenuOption[]
    activeIndex: number
    selectedValues: unknown[]
    isMultiSelect: boolean
    hasCheckboxes: boolean
    hasGroups: boolean
    isFullWidth?: boolean
    ariaLabel?: string
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
    activeIndex: -1,
    isMultiSelect: false,
    hasCheckboxes: false,
    hasGroups: false,
    isFullWidth: true,
    ariaLabel: 'Options',
})

const emit = defineEmits<{
    select: [option: DropdownMenuOption, index: number]
}>()

interface OptionGroup {
    groupId: string
    options: { option: DropdownMenuOption; originalIndex: number }[]
}

const groupedOptions = computed<OptionGroup[]>(() => {
    if (!props.hasGroups) return []
    const groups = new Map<string, { option: DropdownMenuOption; originalIndex: number }[]>()
    props.options.forEach((option, index) => {
        const gid = option.groupId || ''
        if (!groups.has(gid)) groups.set(gid, [])
        groups.get(gid)!.push({ option, originalIndex: index })
    })
    return Array.from(groups.entries()).map(([groupId, options]) => ({ groupId, options }))
})

function isSelected(option: DropdownMenuOption): boolean {
    return props.selectedValues.includes(option.value)
}
</script>

<template>
    <div
        class="dropdown-menu"
        :class="{ 'dropdown-menu--full-width': props.isFullWidth }"
        role="listbox"
        :aria-label="props.ariaLabel"
        :aria-multiselectable="props.isMultiSelect || undefined"
    >
        <!-- Ungrouped rendering -->
        <template v-if="!props.hasGroups">
            <div
                v-for="(option, index) in props.options"
                :key="String(option.value)"
                class="dropdown-menu__option"
                :class="{
                    'dropdown-menu__option--active': index === props.activeIndex,
                    'dropdown-menu__option--selected': isSelected(option),
                    'is-disabled': option.isDisabled,
                }"
                role="option"
                :aria-selected="isSelected(option)"
                :aria-disabled="option.isDisabled || undefined"
                @click="!option.isDisabled && emit('select', option, index)"
            >
                <span
                    v-if="props.hasCheckboxes && props.isMultiSelect"
                    class="dropdown-menu__checkbox"
                    :class="{ 'dropdown-menu__checkbox--checked': isSelected(option) }"
                    aria-hidden="true"
                >
                    <span v-if="isSelected(option)" class="material-symbols-rounded" aria-hidden="true">check</span>
                </span>
                <span
                    v-if="option.icon"
                    class="material-symbols-rounded dropdown-menu__option-icon"
                    aria-hidden="true"
                >{{ option.icon }}</span>
                <slot name="option" :option="option" :is-selected="isSelected(option)">
                    <span class="dropdown-menu__option-label">{{ option.label }}</span>
                </slot>
            </div>
        </template>

        <!-- Grouped rendering -->
        <template v-else>
            <div
                v-for="group in groupedOptions"
                :key="group.groupId"
                class="dropdown-menu__group"
            >
                <div v-if="group.groupId" class="dropdown-menu__group-label">
                    {{ group.groupId }}
                </div>
                <div
                    v-for="{ option, originalIndex } in group.options"
                    :key="String(option.value)"
                    class="dropdown-menu__option"
                    :class="{
                        'dropdown-menu__option--active': originalIndex === props.activeIndex,
                        'dropdown-menu__option--selected': isSelected(option),
                        'is-disabled': option.isDisabled,
                    }"
                    role="option"
                    :aria-selected="isSelected(option)"
                    :aria-disabled="option.isDisabled || undefined"
                    @click="!option.isDisabled && emit('select', option, originalIndex)"
                >
                    <span
                        v-if="props.hasCheckboxes && props.isMultiSelect"
                        class="dropdown-menu__checkbox"
                        :class="{ 'dropdown-menu__checkbox--checked': isSelected(option) }"
                        aria-hidden="true"
                    >
                        <span v-if="isSelected(option)" class="material-symbols-rounded" aria-hidden="true">check</span>
                    </span>
                    <span
                        v-if="option.icon"
                        class="material-symbols-rounded dropdown-menu__option-icon"
                        aria-hidden="true"
                    >{{ option.icon }}</span>
                    <slot name="option" :option="option" :is-selected="isSelected(option)">
                        <span class="dropdown-menu__option-label">{{ option.label }}</span>
                    </slot>
                </div>
            </div>
        </template>

        <!-- Empty state -->
        <div v-if="props.options.length === 0" class="dropdown-menu__empty">
            <slot name="empty">
                <span>No options available</span>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.dropdown-menu {
    max-height: 280px;
    overflow-y: auto;
    padding: 0.25em 0;
}

.dropdown-menu--full-width {
    width: 100%;
}

.dropdown-menu__option {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em 0.75em;
    cursor: pointer;
    font-family: var(--font-ui);
    font-size: 0.9375em;
    color: var(--dropdown-item-color);
    transition: background-color 0.15s;
    user-select: none;
}

.dropdown-menu__option:hover:not(.is-disabled) {
    background-color: var(--dropdown-item-hover-bg);
}

.dropdown-menu__option--active {
    background-color: var(--dropdown-item-hover-bg);
}

.dropdown-menu__option--selected {
    font-weight: 600;
}

.dropdown-menu__option.is-disabled {
    color: var(--dropdown-item-disabled-color);
    cursor: not-allowed;
    pointer-events: none;
}

.dropdown-menu__option-icon {
    flex-shrink: 0;
    font-size: 1.125em;
}

.dropdown-menu__option-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-menu__checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--checkbox-border);
    border-radius: 3px;
    flex-shrink: 0;
    transition: background-color 0.15s, border-color 0.15s;
}

.dropdown-menu__checkbox .material-symbols-rounded {
    font-size: 0.875rem;
}

.dropdown-menu__checkbox--checked {
    background-color: var(--checkbox-accent);
    border-color: var(--checkbox-border-checked);
}

.dropdown-menu__group-label {
    padding: 0.5em 0.75em 0.25em;
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--form-field-description-color);
}

.dropdown-menu__empty {
    padding: 1em;
    text-align: center;
    font-family: var(--font-ui);
    font-size: 0.875em;
    color: var(--form-field-description-color);
}
</style>
