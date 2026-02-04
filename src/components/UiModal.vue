<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { UiModalProps } from '../types'

const props = withDefaults(defineProps<UiModalProps>(), {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmVariant: 'primary',
    confirmDisabled: false,
    actionsDisabled: false,
    noScrolls: false,
})

const emit = defineEmits<{
    close: []
    confirm: []
    cancel: []
    'left-button-click': []
}>()

onMounted(() => {
    document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
    document.body.style.overflow = 'auto'
})

function closeModal() {
    if (props.actionsDisabled) return
    emit('close')
}

function handleCancel() {
    if (props.actionsDisabled) return
    emit('cancel')
}
</script>

<template>
    <Teleport to="body">
        <div class="ui-modal-overlay" @click="closeModal">
            <div
                class="ui-modal"
                :class="{ 'ui-modal--no-scrolls': props.noScrolls }"
                @click.stop
            >
                <header class="ui-modal__header">
                    <h4 class="ui-modal__title">{{ props.title }}</h4>
                    <button
                        class="ui-modal__x-button"
                        :disabled="props.actionsDisabled"
                        @click="closeModal"
                    >&times;</button>
                </header>

                <div class="ui-modal__scroll">
                    <div class="ui-modal__body">
                        <div
                            v-if="props.progressText"
                            class="ui-modal__action-info ui-modal__progress-text"
                        >
                            <span class="ui-modal__action-icon">&#8987;</span>
                            <p>{{ props.progressText }}</p>
                        </div>

                        <div
                            v-if="props.errorText"
                            class="ui-modal__action-info ui-modal__error-text"
                        >
                            <span class="ui-modal__action-icon">&#9888;</span>
                            <p>{{ props.errorText }}</p>
                        </div>

                        <div class="ui-modal__children">
                            <slot />
                        </div>

                        <div
                            v-if="props.infoText"
                            class="ui-modal__action-info ui-modal__info-text"
                        >
                            <span class="ui-modal__action-icon">&#9432;</span>
                            <p>{{ props.infoText }}</p>
                        </div>

                        <div
                            v-if="props.warningText"
                            class="ui-modal__action-info ui-modal__warning-text"
                        >
                            <span class="ui-modal__action-icon">&#9888;</span>
                            <p>{{ props.warningText }}</p>
                        </div>
                    </div>

                    <div class="ui-modal__footer">
                        <button
                            v-if="props.leftButtonText"
                            class="ui-button"
                            :class="[`ui-button--${props.leftButtonVariant ?? 'secondary'}`]"
                            :disabled="props.actionsDisabled"
                            @click="emit('left-button-click')"
                        >{{ props.leftButtonText }}</button>

                        <div class="ui-modal__spacer" />

                        <button
                            class="ui-button ui-button--default"
                            :disabled="props.actionsDisabled"
                            @click="handleCancel"
                        >{{ props.cancelText }}</button>

                        <button
                            class="ui-button"
                            :class="[`ui-button--${props.confirmVariant}`]"
                            :disabled="props.actionsDisabled || props.confirmDisabled"
                            @click="emit('confirm')"
                        >{{ props.confirmText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.ui-modal-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--ui-modal-overlay);
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ui-modal {
    background-color: var(--ui-body-bg);
    border-radius: 6px;
    position: absolute;
    height: 80%;
    width: 100%;
    min-width: 280px;
    bottom: -100%;
    left: 0;
    display: flex;
    flex-direction: column;
    box-shadow: var(--ui-modal-shadow-mobile);
    animation-name: ui-modal-slide-in;
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
    font-size: clamp(14px, 1rem + 2vw, 20px);
    line-height: calc(1.3em + (1.5 - 1.3) * ((100% - 21%) / (35 - 21)));
}

@keyframes ui-modal-slide-in {
    100% {
        bottom: 0;
    }
}

.ui-modal__scroll {
    flex: 1;
    overflow: auto;
}

.ui-modal__header {
    padding: 1em;
    border-bottom: 1px solid var(--ui-card-border-color);
    display: flex;
    gap: 1em;
    align-items: center;
}

.ui-modal__title {
    flex: 1;
    margin: 0;
}

.ui-modal__x-button {
    cursor: pointer;
    display: flex;
    width: 44px;
    min-width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    font-size: 1.75em;
    color: var(--ui-link-color);
    transition: color 0.3s;
}

.ui-modal__x-button:hover {
    color: var(--ui-link-hover);
}

.ui-modal__body {
    padding: 1em 1em 0;
}

.ui-modal__footer {
    padding-top: 1em;
    padding-bottom: 2.5em;
    padding-inline: 2em;
    display: flex;
    align-items: end;
    gap: 1em;
    justify-content: space-between;
    border-top: 1px solid var(--ui-card-border-color);
    flex-wrap: wrap;
}

.ui-modal__footer button {
    min-width: 100px;
}

.ui-modal__spacer {
    display: block;
    width: 100%;
}

.ui-modal__action-info {
    display: flex;
    gap: 1em;
    align-items: center;
    margin-bottom: 1em;
}

.ui-modal__action-info p {
    flex: 1;
    margin-bottom: 0;
    font-style: italic;
    color: var(--ui-info-text);
}

.ui-modal__action-icon {
    font-size: 34px;
    width: 47px;
    text-align: center;
}

.ui-modal__warning-text .ui-modal__action-icon {
    color: var(--ui-warning-icon);
}

.ui-modal__error-text .ui-modal__action-icon {
    color: var(--ui-error-icon);
}

.ui-modal__info-text .ui-modal__action-icon {
    color: var(--ui-info-icon);
}

.ui-modal__progress-text .ui-modal__action-icon {
    color: var(--ui-progress-icon);
}

/* Button styles (inline so modal is self-contained) */
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: "Raleway", system-ui, sans-serif;
    font-weight: 500;
    font-size: 1em;
    padding-block: 12px;
    padding-inline: 1em;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, opacity 0.3s, border-color 0.3s;
}

.ui-button:disabled {
    pointer-events: none;
    opacity: 0.65;
}

.ui-button--default {
    background-color: var(--ui-button-default);
    border: 1px solid var(--ui-button-default-border);
    color: var(--ui-button-default-text);
}

.ui-button--default:hover:not(:disabled) {
    background-color: var(--ui-button-default-hover-bg);
    border-color: var(--ui-button-default-hover-border);
}

.ui-button--primary {
    background-color: var(--ui-primary-btn);
    color: var(--ui-text-color);
}

.ui-button--primary:hover:not(:disabled) {
    background-color: var(--ui-primary-btn-hover);
    box-shadow: var(--ui-primary-btn-hover-shadow);
}

.ui-button--secondary {
    background-color: var(--ui-secondary-btn);
    color: var(--ui-text-color);
}

.ui-button--secondary:hover:not(:disabled) {
    background-color: var(--ui-secondary-btn-hover);
    box-shadow: var(--ui-primary-btn-hover-shadow);
}

.ui-button--danger {
    background-color: var(--ui-button-danger);
    color: var(--ui-button-danger-text);
}

.ui-button--danger:hover:not(:disabled) {
    background-color: var(--ui-button-danger-hover);
    box-shadow: var(--ui-button-danger-hover-shadow);
}

@media only screen and (min-width: 420px) {
    .ui-modal__spacer {
        display: none;
    }
}

@media only screen and (min-width: 540px) {
    .ui-modal {
        min-width: 420px;
        max-width: 540px;
        margin-top: -78px;
        position: relative;
        height: auto;
        max-height: 80%;
        width: 100%;
        bottom: auto;
        left: auto;
        box-shadow: var(--ui-modal-shadow);
        animation: none;
    }

    .ui-modal__scroll {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .ui-modal--no-scrolls .ui-modal__scroll {
        overflow: visible;
    }

    .ui-modal__x-button {
        font-size: 1.25em;
    }

    .ui-modal__title {
        font-size: 1.25em;
    }

    .ui-modal__body {
        flex: 1;
        overflow: auto;
    }

    .ui-modal--no-scrolls .ui-modal__body {
        overflow: visible;
    }

    .ui-modal__footer {
        padding-bottom: 1em;
        padding-inline: 1em;
    }

    .ui-modal__spacer {
        display: block;
        flex: 1;
    }

    .ui-button {
        padding-block: 8px;
    }
}

@media only screen and (min-width: 700px) {
    .ui-modal {
        max-width: 600px;
    }
}
</style>
