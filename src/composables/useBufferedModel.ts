import { ref, watch, type Ref } from 'vue'

interface BufferedModelProps {
    modelValue?: string
}

type BufferedModelEmit = (event: 'update:modelValue', value: string) => void

interface BufferedModelReturn {
    displayValue: Ref<string>
    isFocused: Ref<boolean>
    onInput: (event: Event) => void
    onFocus: () => void
    onBlur: () => void
}

export function useBufferedModel(
    props: BufferedModelProps,
    emit: BufferedModelEmit
): BufferedModelReturn {
    const displayValue = ref(props.modelValue ?? '')
    const isFocused = ref(false)

    watch(
        () => props.modelValue,
        (newValue) => {
            if (!isFocused.value) {
                displayValue.value = newValue ?? ''
            }
        },
    )

    function onInput(event: Event): void {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement
        displayValue.value = target.value
        emit('update:modelValue', target.value)
    }

    function onFocus(): void {
        isFocused.value = true
    }

    function onBlur(): void {
        isFocused.value = false
        displayValue.value = props.modelValue ?? ''
    }

    return {
        displayValue,
        isFocused,
        onInput,
        onFocus,
        onBlur,
    }
}
