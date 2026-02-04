<script setup lang="ts">
import { computed } from 'vue'
import type { UiUserIconProps } from '../types'
import { stringToColor, getTextColorForBackground } from '../utils/color'

const props = defineProps<UiUserIconProps>()

const tag = computed(() => Array.from(props.name)[0])
const backgroundColor = computed(() => stringToColor(props.name))
const color = computed(() => getTextColorForBackground(backgroundColor.value))
</script>

<template>
    <div
        class="ui-user-icon"
        :style="{ backgroundColor: backgroundColor, color: color }"
    >{{ tag }}</div>
</template>

<style scoped>
.ui-user-icon {
    border-radius: 50%;
    font-size: 1em;
    font-weight: bold;
    height: 1.5em;
    overflow: hidden;
    width: 1.5em;
    min-width: 1.5em;
    padding-top: 0.25em;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    line-height: 0;
    justify-content: center;
    box-sizing: border-box;
}
</style>
