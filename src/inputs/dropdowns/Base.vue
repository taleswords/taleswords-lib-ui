<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { uid } from '../../utils/uid'
import { calculateFloatingPosition } from '../../utils/floatingPosition'
import DropdownTrigger from './components/Trigger.vue'
import DropdownHeader from './components/Header.vue'
import DropdownMenu from './components/Menu.vue'
import DropdownFooter from './components/Footer.vue'

// ── Types ──────────────────────────────────────────

export interface DropdownOption<TValue = unknown> {
    value: TValue
    label: string
    isDisabled?: boolean
    icon?: string
    groupId?: string
}

export interface DropdownBaseProps<TValue = unknown> {
    modelValue?: TValue | TValue[]
    options?: DropdownOption<TValue>[]
    isMultiSelect?: boolean
    hasSearch?: boolean
    hasGroups?: boolean
    hasApplyButton?: boolean
    hasCheckboxes?: boolean
    hasClearButton?: boolean
    isDisabled?: boolean
    hasError?: boolean
    placeholder?: string
    searchPlaceholder?: string
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
    testId?: string
}

// ── Slots ──────────────────────────────────────────

defineSlots<{
    trigger?: (slotProps: { selectedLabel: string; isOpen: boolean; toggle: () => void }) => unknown
    option?: (slotProps: { option: DropdownOption<unknown>; isSelected: boolean }) => unknown
    selected?: (slotProps: { selectedOptions: DropdownOption<unknown>[]; selectedLabel: string }) => unknown
    empty?: () => unknown
    header?: () => unknown
    footer?: () => unknown
}>()

// ── Props / Emits ──────────────────────────────────

const props = withDefaults(defineProps<DropdownBaseProps>(), {
    options: () => [],
    isMultiSelect: false,
    hasSearch: false,
    hasGroups: false,
    hasApplyButton: false,
    hasCheckboxes: false,
    hasClearButton: false,
    isDisabled: false,
    hasError: false,
    placeholder: 'Select...',
    searchPlaceholder: 'Search...',
    placement: 'bottom-start',
    offset: 4,
    testId: 'dropdown-base',
})

const emit = defineEmits<{
    'update:modelValue': [value: unknown]
    open: []
    close: []
    search: [query: string]
    apply: [values: unknown[]]
    clear: []
    'selection-changed': [selection: unknown]
    'active-option-changed': [option: DropdownOption<unknown> | null]
}>()

// ── Refs ───────────────────────────────────────────

const containerRef = ref<HTMLElement | null>(null)
const triggerWrapperRef = ref<HTMLElement | null>(null)
const menuContainerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const activeIndex = ref(-1)
const pendingSelection = ref<unknown[]>([])

const dropdownId = uid('dropdown')
const listboxId = `${dropdownId}-listbox`

// ── Computed ───────────────────────────────────────

const selectedValues = computed<unknown[]>(() => {
    if (props.modelValue === undefined || props.modelValue === null) return []
    if (Array.isArray(props.modelValue)) return props.modelValue
    return [props.modelValue]
})

const workingSelection = computed<unknown[]>(() => {
    if (props.hasApplyButton && props.isMultiSelect) return pendingSelection.value
    return selectedValues.value
})

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options
    const q = searchQuery.value.toLowerCase()
    return props.options.filter((opt) => opt.label.toLowerCase().includes(q))
})

const selectedOptions = computed(() => {
    return props.options.filter((opt) => selectedValues.value.includes(opt.value))
})

const selectedLabel = computed(() => {
    if (selectedOptions.value.length === 0) return ''
    if (!props.isMultiSelect) return selectedOptions.value[0]?.label ?? ''
    return selectedOptions.value.map((o) => o.label).join(', ')
})

// ── Outside click ──────────────────────────────────

function handleOutsideClick(event: MouseEvent): void {
    if (!isOpen.value) return
    const target = event.target as Node
    if (containerRef.value?.contains(target)) return
    if (menuContainerRef.value?.contains(target)) return
    close()
}

onMounted(() => {
    document.addEventListener('mousedown', handleOutsideClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleOutsideClick)
})

// ── Scroll/resize repositioning ────────────────────

function updatePosition(): void {
    if (!isOpen.value || !triggerWrapperRef.value || !menuContainerRef.value) return
    const triggerRect = triggerWrapperRef.value.getBoundingClientRect()
    const menuRect = menuContainerRef.value.getBoundingClientRect()
    const pos = calculateFloatingPosition(
        triggerRect,
        menuRect,
        { width: window.innerWidth, height: window.innerHeight },
        { placement: 'bottom-start', offset: props.offset, collisionPadding: 0, flip: true, shift: true },
    )
    menuContainerRef.value.style.top = `${pos.y}px`
    menuContainerRef.value.style.left = `${pos.x}px`
    menuContainerRef.value.style.width = `${triggerRect.width}px`
}

onMounted(() => {
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
})

// ── Watchers ───────────────────────────────────────

watch(isOpen, (newVal) => {
    if (newVal) {
        if (props.hasApplyButton && props.isMultiSelect) {
            pendingSelection.value = [...selectedValues.value]
        }
        activeIndex.value = -1
        nextTick(updatePosition)
    }
})

// ── Methods ────────────────────────────────────────

function open(): void {
    if (props.isDisabled || isOpen.value) return
    isOpen.value = true
    emit('open')
}

function close(): void {
    if (!isOpen.value) return
    isOpen.value = false
    searchQuery.value = ''
    emit('close')
}

function toggle(): void {
    if (isOpen.value) close()
    else open()
}

function resetSearch(): void {
    searchQuery.value = ''
}

function getSelectedOptions(): DropdownOption<unknown>[] {
    return [...selectedOptions.value]
}

function handleSelect(option: { value: unknown; label: string; isDisabled?: boolean; icon?: string; groupId?: string }): void {
    if (option.isDisabled) return

    if (props.isMultiSelect) {
        if (props.hasApplyButton) {
            const idx = pendingSelection.value.indexOf(option.value)
            if (idx >= 0) pendingSelection.value.splice(idx, 1)
            else pendingSelection.value.push(option.value)
        } else {
            const current = [...selectedValues.value]
            const idx = current.indexOf(option.value)
            if (idx >= 0) current.splice(idx, 1)
            else current.push(option.value)
            emit('update:modelValue', current)
            emit('selection-changed', current)
        }
    } else {
        emit('update:modelValue', option.value)
        emit('selection-changed', option.value)
        close()
    }
}

function handleApply(): void {
    emit('update:modelValue', [...pendingSelection.value])
    emit('apply', [...pendingSelection.value])
    emit('selection-changed', [...pendingSelection.value])
    close()
}

function handleClear(): void {
    if (props.isMultiSelect) {
        if (props.hasApplyButton) {
            pendingSelection.value = []
        } else {
            emit('update:modelValue', [])
            emit('selection-changed', [])
        }
    } else {
        emit('update:modelValue', undefined)
        emit('selection-changed', undefined)
    }
    emit('clear')
}

function handleSearchUpdate(query: string): void {
    searchQuery.value = query
    activeIndex.value = -1
    emit('search', query)
}

function handleKeydown(event: KeyboardEvent): void {
    if (!isOpen.value) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            open()
            return
        }
        return
    }

    const opts = filteredOptions.value

    switch (event.key) {
        case 'ArrowDown': {
            event.preventDefault()
            let next = activeIndex.value + 1
            while (next < opts.length && opts[next]?.isDisabled) next++
            if (next < opts.length) {
                activeIndex.value = next
                emit('active-option-changed', opts[next] as DropdownOption<unknown>)
            }
            break
        }
        case 'ArrowUp': {
            event.preventDefault()
            let prev = activeIndex.value - 1
            while (prev >= 0 && opts[prev]?.isDisabled) prev--
            if (prev >= 0) {
                activeIndex.value = prev
                emit('active-option-changed', opts[prev] as DropdownOption<unknown>)
            }
            break
        }
        case 'Enter': {
            event.preventDefault()
            if (activeIndex.value >= 0 && activeIndex.value < opts.length) {
                const opt = opts[activeIndex.value]
                if (opt && !opt.isDisabled) handleSelect(opt)
            }
            break
        }
        case 'Escape': {
            event.preventDefault()
            close()
            break
        }
        case 'Home': {
            event.preventDefault()
            activeIndex.value = 0
            break
        }
        case 'End': {
            event.preventDefault()
            activeIndex.value = opts.length - 1
            break
        }
    }
}

// ── Expose ─────────────────────────────────────────

defineExpose({ open, close, toggle, resetSearch, getSelectedOptions })
</script>

<template>
    <div
        ref="containerRef"
        class="dropdown"
        :data-testid="props.testId"
        @keydown="handleKeydown"
    >
        <!-- Trigger -->
        <div ref="triggerWrapperRef" class="dropdown__trigger-wrapper">
            <slot
                name="trigger"
                :selected-label="selectedLabel"
                :is-open="isOpen"
                :toggle="toggle"
            >
                <DropdownTrigger
                    :selected-label="selectedLabel"
                    :placeholder="props.placeholder"
                    :is-open="isOpen"
                    :is-disabled="props.isDisabled"
                    :has-error="props.hasError"
                    @toggle="toggle"
                >
                    <template v-if="$slots.selected && selectedOptions.length > 0" #default>
                        <slot
                            name="selected"
                            :selected-options="selectedOptions"
                            :selected-label="selectedLabel"
                        />
                    </template>
                </DropdownTrigger>
            </slot>
        </div>

        <!-- Menu panel (teleported to body to escape overflow:hidden parents) -->
        <Teleport to="body">
        <div
            v-if="isOpen"
            ref="menuContainerRef"
            class="dropdown__panel"
            :id="listboxId"
            @keydown="handleKeydown"
        >
            <!-- Header -->
            <slot name="header">
                <DropdownHeader
                    :has-search="props.hasSearch"
                    :search-query="searchQuery"
                    :search-placeholder="props.searchPlaceholder"
                    @update:search-query="handleSearchUpdate"
                />
            </slot>

            <!-- Menu options -->
            <DropdownMenu
                :options="filteredOptions"
                :active-index="activeIndex"
                :selected-values="workingSelection"
                :is-multi-select="props.isMultiSelect"
                :has-checkboxes="props.hasCheckboxes"
                :has-groups="props.hasGroups"
                @select="handleSelect"
            >
                <template v-if="$slots.option" #option="slotProps">
                    <slot name="option" :option="slotProps.option" :is-selected="slotProps.isSelected" />
                </template>
                <template v-if="$slots.empty" #empty>
                    <slot name="empty" />
                </template>
            </DropdownMenu>

            <!-- Footer -->
            <slot name="footer">
                <DropdownFooter
                    :has-apply-button="props.hasApplyButton && props.isMultiSelect"
                    :has-clear-button="props.hasClearButton"
                    @apply="handleApply"
                    @clear="handleClear"
                />
            </slot>
        </div>
        </Teleport>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
}

.dropdown__panel {
    position: fixed;
    z-index: 9999;
    background-color: var(--dropdown-bg);
    border: 1px solid var(--dropdown-border);
    border-radius: var(--button-border-radius);
    box-shadow: var(--dropdown-shadow);
    overflow: hidden;
}
</style>
