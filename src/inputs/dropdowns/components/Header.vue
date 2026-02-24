<script setup lang="ts">
export interface DropdownHeaderProps {
    hasSearch: boolean
    searchQuery: string
    searchPlaceholder?: string
}

const props = withDefaults(defineProps<DropdownHeaderProps>(), {
    hasSearch: false,
    searchQuery: '',
    searchPlaceholder: 'Search...',
})

const emit = defineEmits<{
    'update:searchQuery': [value: string]
}>()

function onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    emit('update:searchQuery', target.value)
}
</script>

<template>
    <div v-if="props.hasSearch" class="dropdown-header">
        <div class="dropdown-header__search">
            <i class="dropdown-header__search-icon icon-search" aria-hidden="true" />
            <input
                class="dropdown-header__search-input"
                type="text"
                :value="props.searchQuery"
                :placeholder="props.searchPlaceholder"
                autocomplete="off"
                @input="onInput"
            />
        </div>
    </div>
</template>

<style scoped>
.dropdown-header {
    padding: 0.5em;
    border-bottom: 1px solid var(--dropdown-border);
}

.dropdown-header__search {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.375em 0.5em;
    border: 1px solid var(--textbox-border);
    border-radius: var(--textbox-border-radius);
    background-color: var(--textbox-bg);
}

.dropdown-header__search:focus-within {
    border-color: var(--textbox-border-focus);
}

.dropdown-header__search-icon {
    color: var(--textbox-placeholder);
    font-size: 0.875em;
    flex-shrink: 0;
}

.dropdown-header__search-icon::before {
    margin: 0;
    width: auto;
}

.dropdown-header__search-input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--textbox-text);
    font-family: var(--font-ui);
    font-size: 0.875em;
    width: 100%;
    padding: 0;
}

.dropdown-header__search-input::placeholder {
    color: var(--textbox-placeholder);
}
</style>
