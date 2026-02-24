<script setup lang="ts">
import { UiCard } from '@lib'
</script>

<template>
    <UiCard variant="outlined">
        <h2>Typography</h2>
        <UiCard>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <p>Body text in Lora serif. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Second paragraph for spacing. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>
                <a href="#">Primary link</a> &mdash;
                <a href="#" class="secondary">Secondary link</a> &mdash;
                <a href="#" class="external">External link<i class="icon-link-ext" /></a>
            </p>
            <label>Label</label>
            <label class="required">Required label</label>
            <span class="error-text">Error text</span>
            <span class="info-text">Info text</span>
        </UiCard>
    </UiCard>

    <UiCard variant="outlined">
        <h2>Icons</h2>
        <div class="icons-grid">
            <span class="icon-demo"><i class="icon-cancel"></i> cancel</span>
            <span class="icon-demo"><i class="icon-ok"></i> ok</span>
            <span class="icon-demo"><i class="icon-plus"></i> plus</span>
            <span class="icon-demo"><i class="icon-edit"></i> edit</span>
            <span class="icon-demo"><i class="icon-pencil"></i> pencil</span>
            <span class="icon-demo"><i class="icon-trash-empty"></i> trash-empty</span>
            <span class="icon-demo"><i class="icon-search"></i> search</span>
            <span class="icon-demo"><i class="icon-cog"></i> cog</span>
            <span class="icon-demo"><i class="icon-login"></i> login</span>
            <span class="icon-demo"><i class="icon-logout"></i> logout</span>
            <span class="icon-demo"><i class="icon-users"></i> users</span>
            <span class="icon-demo"><i class="icon-user-plus"></i> user-plus</span>
            <span class="icon-demo"><i class="icon-user-times"></i> user-times</span>
            <span class="icon-demo"><i class="icon-globe"></i> globe</span>
            <span class="icon-demo"><i class="icon-link-ext"></i> link-ext</span>
            <span class="icon-demo"><i class="icon-info-circled"></i> info-circled</span>
            <span class="icon-demo"><i class="icon-attention"></i> attention</span>
            <span class="icon-demo"><i class="icon-attention-circled"></i> attention-circled</span>
            <span class="icon-demo"><i class="icon-help-circled"></i> help-circled</span>
            <span class="icon-demo"><i class="icon-ok-circled2"></i> ok-circled2</span>
            <span class="icon-demo"><i class="icon-cancel-circled2"></i> cancel-circled2</span>
            <span class="icon-demo"><i class="icon-question-circle-o"></i> question-circle-o</span>
            <span class="icon-demo"><i class="icon-down-dir"></i> down-dir</span>
            <span class="icon-demo"><i class="icon-up-dir"></i> up-dir</span>
            <span class="icon-demo"><i class="icon-left"></i> left</span>
            <span class="icon-demo"><i class="icon-right"></i> right</span>
            <span class="icon-demo"><i class="icon-level-up"></i> level-up</span>
            <span class="icon-demo"><i class="icon-level-down"></i> level-down</span>
            <span class="icon-demo"><i class="icon-plus-squared"></i> plus-squared</span>
            <span class="icon-demo"><i class="icon-minus-squared"></i> minus-squared</span>
            <span class="icon-demo"><i class="icon-ok-squared"></i> ok-squared</span>
            <span class="icon-demo"><i class="icon-dot-circled"></i> dot-circled</span>
            <span class="icon-demo"><i class="icon-toggle-on"></i> toggle-on</span>
            <span class="icon-demo"><i class="icon-toggle-off"></i> toggle-off</span>
            <span class="icon-demo"><i class="icon-cubes"></i> cubes</span>
            <span class="icon-demo"><i class="icon-diamond"></i> diamond</span>
            <span class="icon-demo"><i class="icon-dollar"></i> dollar</span>
            <span class="icon-demo"><i class="icon-chat"></i> chat</span>
            <span class="icon-demo"><i class="icon-picture"></i> picture</span>
            <span class="icon-demo"><i class="icon-file-image"></i> file-image</span>
            <span class="icon-demo"><i class="icon-spinner"></i> spinner</span>
            <span class="icon-demo"><i class="icon-apple"></i> apple</span>
            <span class="icon-demo"><i class="icon-android"></i> android</span>
        </div>
    </UiCard>
</template>

<style scoped>
.icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
}

.icon-demo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.icon-demo i {
    font-size: 1.25rem;
}
</style>
