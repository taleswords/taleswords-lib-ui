<script setup lang="ts">
import { ref } from 'vue'
import { Switch, CardBase } from '@lib'

const sm = ref(false)
const md = ref(true)
const lg = ref(false)
const disabledOff = ref(false)
const disabledOn = ref(true)
</script>

<template>
    <div class="page" data-testid="page-switches">
        <h1>Switches</h1>

        <CardBase title="Sizes">
            <div class="demo-stack">
                <Switch v-model="sm" size="small" label="Small switch" />
                <Switch v-model="md" size="medium" label="Medium switch" />
                <Switch v-model="lg" size="large" label="Large switch" />
            </div>
        </CardBase>

        <CardBase title="Disabled">
            <div class="demo-stack">
                <Switch v-model="disabledOff" label="Disabled (off)" is-disabled />
                <Switch v-model="disabledOn" label="Disabled (on)" is-disabled />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>
