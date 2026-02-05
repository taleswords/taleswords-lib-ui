<script setup lang="ts">
import type { UiIconProps } from '../types'

const props = withDefaults(defineProps<UiIconProps>(), {
    size: 'medium',
})
</script>

<template>
    <i
        class="ui-icon"
        :class="[
            `icon-${props.name}`,
            `ui-icon--${props.size}`,
        ]"
        aria-hidden="true"
    />
</template>

<style scoped>
.ui-icon {
    display: inline-block;
    line-height: 1;
}

.ui-icon::before {
    margin: 0;
    width: auto;
}

.ui-icon--small {
    font-size: 0.875em;
}

.ui-icon--medium {
    font-size: 1em;
}

.ui-icon--large {
    font-size: 1.5em;
}
</style>
