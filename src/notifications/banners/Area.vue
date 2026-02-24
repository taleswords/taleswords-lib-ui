<script setup lang="ts">
import { useBanner } from '../../utils/useBanner'
import BannerBase from './Base.vue'

export interface BannerAreaProps {
    testId?: string
}

withDefaults(defineProps<BannerAreaProps>(), {
    testId: 'banner-area',
})

const emit = defineEmits<{
    'dont-show-again': [id: number]
}>()

const { banners, removeBanner } = useBanner()
</script>

<template>
    <div
        class="banner-area"
        aria-live="polite"
        :data-testid="testId"
    >
        <TransitionGroup name="banner">
            <BannerBase
                v-for="banner in banners"
                :key="banner.id"
                :id="banner.id"
                :variant="banner.variant"
                :message="banner.message"
                :is-dismissible="banner.isDismissible"
                :has-dont-show-again="banner.hasDontShowAgain"
                @dismiss="removeBanner"
                @dont-show-again="emit('dont-show-again', $event)"
            />
        </TransitionGroup>
    </div>
</template>

<style scoped>
.banner-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.banner-enter-active,
.banner-leave-active {
    transition: all 0.3s ease;
}

.banner-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.banner-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.banner-move {
    transition: transform 0.3s ease;
}
</style>
