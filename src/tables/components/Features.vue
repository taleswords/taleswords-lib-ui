<script setup lang="ts">
export interface TableFeaturesProps {
    hasSearch?: boolean
    searchQuery?: string
    searchPlaceholder?: string
}

withDefaults(defineProps<TableFeaturesProps>(), {
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
    <div class="table-features">
        <div v-if="hasSearch" class="table-features__search">
            <span class="material-symbols-rounded table-features__search-icon" aria-hidden="true">search</span>
            <input
                class="table-features__search-input"
                type="text"
                :value="searchQuery"
                :placeholder="searchPlaceholder"
                autocomplete="off"
                @input="onInput"
            />
        </div>
        <div class="table-features__actions">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.table-features {
    display: flex;
    align-items: center;
    gap: 0.75em;
    padding: 0.75em 0;
}

.table-features__search {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.375em 0.625em;
    border: 1px solid var(--textbox-border);
    border-radius: var(--textbox-border-radius);
    background-color: var(--textbox-bg);
    flex: 0 1 20em;
}

.table-features__search:focus-within {
    border-color: var(--textbox-border-focus);
    box-shadow: var(--textbox-shadow-focus);
}

.table-features__search-icon {
    color: var(--textbox-placeholder);
    font-size: 1.125em;
    flex-shrink: 0;
}

.table-features__search-input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--textbox-text);
    font-family: var(--font-ui);
    font-size: 0.875em;
    width: 100%;
    padding: 0;
}

.table-features__search-input::placeholder {
    color: var(--textbox-placeholder);
}

.table-features__actions {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-left: auto;
}
</style>
