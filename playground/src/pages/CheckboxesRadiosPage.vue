<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxBase, CheckboxInput, Radio, CardBase } from '@lib'

const cb1 = ref(false)
const cb2 = ref(true)
const cb3 = ref(false)
const cb4 = ref(false)

const radio1 = ref('option-a')
const radio2 = ref('')
</script>

<template>
    <div class="page" data-testid="page-checkboxes-radios">
        <h1>Checkboxes & Radios</h1>

        <CardBase title="CheckboxBase">
            <div class="demo-stack">
                <CheckboxBase v-model="cb1" label="Unchecked by default" />
                <CheckboxBase v-model="cb2" label="Checked by default" />
                <CheckboxBase v-model="cb3" label="Disabled checkbox" is-disabled />
                <CheckboxBase v-model="cb4" label="Error state" has-error />
            </div>
        </CardBase>

        <CardBase title="CheckboxInput (visual only)">
            <div class="demo-row">
                <CheckboxInput />
                <CheckboxInput is-checked />
                <CheckboxInput is-disabled />
                <CheckboxInput is-checked is-disabled />
                <CheckboxInput has-error />
            </div>
        </CardBase>

        <CardBase title="Radio Group">
            <div class="demo-stack">
                <Radio v-model="radio1" value="option-a" name="demo-group" label="Option A" />
                <Radio v-model="radio1" value="option-b" name="demo-group" label="Option B" />
                <Radio v-model="radio1" value="option-c" name="demo-group" label="Option C" />
            </div>
        </CardBase>

        <CardBase title="Radio States">
            <div class="demo-stack">
                <Radio v-model="radio2" value="disabled-opt" name="state-group" label="Disabled radio" is-disabled />
                <Radio v-model="radio2" value="error-opt" name="state-group" label="Error radio" has-error />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}

.demo-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>
