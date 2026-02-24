import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useOutsideClick(
    elementRef: Ref<HTMLElement | null | undefined>,
    callback: () => void
): void {
    function handler(event: MouseEvent): void {
        const el = elementRef.value
        if (!el) return
        if (el === event.target || el.contains(event.target as Node)) return
        callback()
    }

    onMounted(() => {
        document.addEventListener('mousedown', handler)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handler)
    })
}
