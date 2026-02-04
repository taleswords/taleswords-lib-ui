<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { UiDropdownMenuProps } from '../types'

const props = withDefaults(defineProps<UiDropdownMenuProps>(), {
    align: 'left',
})

const emit = defineEmits<{ action: [action: string] }>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

function toggle() {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        nextTick(() => focusFirstItem())
    }
}

function close() {
    isOpen.value = false
}

function handleAction(action: string) {
    emit('action', action)
    close()
}

function focusFirstItem() {
    const items = menuRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
    items?.[0]?.focus()
}

function handleKeydown(e: KeyboardEvent) {
    const items = Array.from(menuRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? [])
    const currentIndex = items.indexOf(document.activeElement as HTMLElement)

    switch (e.key) {
        case 'ArrowDown': {
            e.preventDefault()
            const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
            items[next]?.focus()
            break
        }
        case 'ArrowUp': {
            e.preventDefault()
            const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
            items[prev]?.focus()
            break
        }
        case 'Escape':
            e.preventDefault()
            close()
            triggerRef.value?.querySelector('button, [tabindex]')?.dispatchEvent(new Event('focus'))
            break
        case 'Enter':
        case ' ':
            e.preventDefault()
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.click()
            }
            break
    }
}

function handleClickOutside(e: MouseEvent) {
    const el = triggerRef.value?.parentElement
    if (el && !el.contains(e.target as Node)) {
        close()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="ui-dropdown-menu">
        <div
            ref="triggerRef"
            class="ui-dropdown-menu__trigger"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            @click="toggle"
        >
            <slot />
        </div>
        <div
            v-if="isOpen"
            ref="menuRef"
            role="menu"
            class="ui-dropdown-menu__panel"
            :class="[`ui-dropdown-menu__panel--${props.align}`]"
            @keydown="handleKeydown"
        >
            <button
                v-for="item in props.items"
                :key="item.action"
                role="menuitem"
                class="ui-dropdown-menu__item"
                :class="{
                    'ui-dropdown-menu__item--danger': item.variant === 'danger',
                    'ui-dropdown-menu__item--disabled': item.disabled,
                }"
                :disabled="item.disabled"
                :aria-disabled="item.disabled"
                :tabindex="item.disabled ? -1 : 0"
                @click="!item.disabled && handleAction(item.action)"
            >{{ item.label }}</button>
        </div>
    </div>
</template>

<style scoped>
.ui-dropdown-menu {
    position: relative;
    display: inline-block;
}

.ui-dropdown-menu__trigger {
    cursor: pointer;
}

.ui-dropdown-menu__panel {
    position: absolute;
    top: 100%;
    margin-top: 4px;
    min-width: 160px;
    background-color: var(--ui-dropdown-bg);
    border: 1px solid var(--ui-dropdown-border);
    border-radius: 6px;
    box-shadow: var(--ui-dropdown-shadow);
    z-index: 100;
    padding: 4px 0;
}

.ui-dropdown-menu__panel--left {
    left: 0;
}

.ui-dropdown-menu__panel--right {
    right: 0;
}

.ui-dropdown-menu__item {
    display: block;
    width: 100%;
    padding: 0.625em 1em;
    border: none;
    background: none;
    font-family: 'Source Sans Pro', system-ui, sans-serif;
    font-size: 0.9375em;
    color: var(--ui-dropdown-item-color);
    cursor: pointer;
    text-align: left;
    transition: background-color 0.15s;
}

.ui-dropdown-menu__item:hover:not(:disabled) {
    background-color: var(--ui-dropdown-item-hover-bg);
}

.ui-dropdown-menu__item:focus-visible {
    outline: 2px solid var(--ui-input-focus-border-color);
    outline-offset: -2px;
}

.ui-dropdown-menu__item--danger {
    color: var(--ui-dropdown-item-danger-color);
}

.ui-dropdown-menu__item--disabled {
    color: var(--ui-dropdown-item-disabled-color);
    cursor: not-allowed;
}
</style>
