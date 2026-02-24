<script setup lang="ts">
import { ButtonBase, CardBase } from '@lib'
</script>

<template>
    <div class="page" data-testid="page-buttons">
        <h1>Buttons</h1>

        <CardBase title="Variants">
            <div class="demo-row">
                <ButtonBase variant="default" label="Default" />
                <ButtonBase variant="primary" label="Primary" />
                <ButtonBase variant="secondary" label="Secondary" />
                <ButtonBase variant="danger" label="Danger" />
                <ButtonBase variant="ghost" label="Ghost" />
                <ButtonBase variant="ghost-primary" label="Ghost Primary" />
                <ButtonBase variant="ghost-danger" label="Ghost Danger" />
            </div>
        </CardBase>

        <CardBase title="Sizes">
            <div class="demo-row">
                <ButtonBase variant="primary" size="small" label="Small" />
                <ButtonBase variant="primary" size="medium" label="Medium" />
            </div>
        </CardBase>

        <CardBase title="With Icons">
            <div class="demo-row">
                <ButtonBase variant="primary" icon="add" label="Add Item" />
                <ButtonBase variant="secondary" icon="download" icon-position="right" label="Download" />
                <ButtonBase variant="danger" icon="delete" label="Delete" />
                <ButtonBase variant="ghost" icon="settings" />
                <ButtonBase variant="ghost-primary" icon="edit" label="Edit" />
            </div>
        </CardBase>

        <CardBase title="Icon-Only Buttons">
            <div class="demo-row">
                <ButtonBase variant="default" icon="search" />
                <ButtonBase variant="primary" icon="add" />
                <ButtonBase variant="secondary" icon="edit" />
                <ButtonBase variant="danger" icon="delete" />
                <ButtonBase variant="ghost" icon="more_vert" />
                <ButtonBase variant="ghost" icon="close" />
            </div>
        </CardBase>

        <CardBase title="Small with Icons">
            <div class="demo-row">
                <ButtonBase variant="primary" size="small" icon="save" label="Save" />
                <ButtonBase variant="secondary" size="small" icon="content_copy" label="Copy" />
                <ButtonBase variant="ghost" size="small" icon="refresh" />
            </div>
        </CardBase>

        <CardBase title="Disabled">
            <div class="demo-row">
                <ButtonBase variant="primary" label="Primary" is-disabled />
                <ButtonBase variant="secondary" label="Secondary" is-disabled />
                <ButtonBase variant="danger" label="Danger" is-disabled />
                <ButtonBase variant="ghost" label="Ghost" is-disabled />
            </div>
        </CardBase>

        <CardBase title="As Link">
            <div class="demo-row">
                <ButtonBase variant="primary" label="External Link" href="#" />
            </div>
        </CardBase>
    </div>
</template>

<style scoped>
.demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
}
</style>
