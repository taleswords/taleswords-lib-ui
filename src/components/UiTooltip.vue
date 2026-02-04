<script setup lang="ts">
import { computed } from 'vue'
import type { UiTooltipProps } from '../types'

const props = withDefaults(defineProps<UiTooltipProps>(), {
    position: 'top',
})

const tooltipId = computed(() => `ui-tooltip-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
    <div
        class="ui-tooltip"
        :class="[`ui-tooltip--${props.position}`]"
    >
        <div class="ui-tooltip__trigger" :aria-describedby="tooltipId">
            <slot />
        </div>
        <div
            :id="tooltipId"
            role="tooltip"
            class="ui-tooltip__content"
        >{{ props.text }}</div>
    </div>
</template>

<style scoped>
.ui-tooltip {
    position: relative;
    display: inline-block;
}

.ui-tooltip__content {
    position: absolute;
    background-color: var(--ui-tooltip-bg);
    color: var(--ui-tooltip-text);
    padding: 0.5em 0.75em;
    border-radius: 4px;
    font-size: 0.875em;
    white-space: nowrap;
    box-shadow: var(--ui-tooltip-shadow);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 100;
}

.ui-tooltip:hover .ui-tooltip__content,
.ui-tooltip:focus-within .ui-tooltip__content {
    opacity: 1;
}

/* Arrow */
.ui-tooltip__content::after {
    content: '';
    position: absolute;
    border: 5px solid transparent;
}

/* Top */
.ui-tooltip--top .ui-tooltip__content {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
}

.ui-tooltip--top .ui-tooltip__content::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: var(--ui-tooltip-bg);
}

/* Bottom */
.ui-tooltip--bottom .ui-tooltip__content {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
}

.ui-tooltip--bottom .ui-tooltip__content::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: var(--ui-tooltip-bg);
}

/* Left */
.ui-tooltip--left .ui-tooltip__content {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;
}

.ui-tooltip--left .ui-tooltip__content::after {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: var(--ui-tooltip-bg);
}

/* Right */
.ui-tooltip--right .ui-tooltip__content {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
}

.ui-tooltip--right .ui-tooltip__content::after {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: var(--ui-tooltip-bg);
}
</style>
