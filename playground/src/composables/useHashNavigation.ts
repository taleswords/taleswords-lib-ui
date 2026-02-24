import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useHashNavigation() {
    const route = useRoute()
    let highlightTimeout: ReturnType<typeof setTimeout> | null = null

    function scrollToHash(): void {
        const hash = window.location.hash
        if (!hash) return

        const targetId = hash.substring(1)
        const targetElement = document.getElementById(targetId)
        if (!targetElement) return

        document.querySelectorAll('.hash-highlight').forEach(el => {
            el.classList.remove('hash-highlight')
        })

        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        targetElement.classList.add('hash-highlight')

        if (highlightTimeout) clearTimeout(highlightTimeout)
        highlightTimeout = setTimeout(() => {
            targetElement.classList.remove('hash-highlight')
        }, 3000)
    }

    function handleHashChange(): void {
        scrollToHash()
    }

    onMounted(() => {
        setTimeout(scrollToHash, 100)
        window.addEventListener('hashchange', handleHashChange)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('hashchange', handleHashChange)
        if (highlightTimeout) clearTimeout(highlightTimeout)
    })

    watch(() => route.hash, () => {
        if (route.hash) {
            setTimeout(scrollToHash, 100)
        }
    })

    return { scrollToHash }
}
