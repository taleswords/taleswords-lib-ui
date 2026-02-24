<script setup lang="ts">
import { ref } from 'vue'
import { ProgressBar, CardBase, ButtonBase } from '@lib'

const dynamicValue = ref(45)

function randomize(): void {
    dynamicValue.value = Math.floor(Math.random() * 101)
}
</script>

<template>
    <div class="page" data-testid="page-progress">
        <h1>Progress Bars</h1>

        <CardBase title="Variants">
            <div class="demo-stack">
                <ProgressBar :value="25" variant="default" />
                <ProgressBar :value="50" variant="success" />
                <ProgressBar :value="75" variant="warning" />
                <ProgressBar :value="100" variant="danger" />
            </div>
        </CardBase>

        <CardBase title="With Labels">
            <div class="demo-stack">
                <ProgressBar :value="33" show-label />
                <ProgressBar :value="66" variant="success" show-label />
                <ProgressBar :value="100" variant="danger" show-label />
            </div>
        </CardBase>

        <CardBase title="Custom Aria Label">
            <ProgressBar :value="60" aria-label="File upload progress" show-label />
        </CardBase>

        <CardBase title="Interactive">
            <ProgressBar :value="dynamicValue" variant="success" show-label />
            <div class="demo-row" style="margin-top: 0.75rem;">
                <ButtonBase variant="secondary" size="small" label="Randomize" @click="randomize" />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.demo-row {
    display: flex;
    gap: 0.75rem;
}
</style>
