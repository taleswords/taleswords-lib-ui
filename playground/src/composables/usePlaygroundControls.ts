import { ref } from 'vue'

const isDark = ref(false)
const isLoading = ref(false)

export function usePlaygroundControls() {
    function toggleTheme(): void {
        isDark.value = !isDark.value
        document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : '')
    }

    function setLoading(value: boolean): void {
        isLoading.value = value
    }

    return { isDark, isLoading, toggleTheme, setLoading }
}
