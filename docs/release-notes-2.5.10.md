# Release Notes — @taleswords/lib-ui 2.5.10

**Type:** Patch

---

## Summary

Focus-aware editing stabilization for form inputs. Inputs now maintain an internal display buffer during active editing, preventing autosave or external state updates from overwriting in-progress user input.

## New Composable

### useBufferedModel()

Reusable composable at `src/composables/useBufferedModel.ts` that manages:

- focus state tracking
- buffered display value
- synchronization rules between modelValue and displayed value

While the input is focused, external modelValue updates are ignored. On blur, the display value resynchronizes with the canonical modelValue.

```ts
const { displayValue, isFocused, onInput, onFocus, onBlur } = useBufferedModel(props, emit)
```

Exported from the library for consumer use.

## Updated Component

### TextboxBase

Integrated `useBufferedModel()` into TextboxBase (both single-line input and multiline textarea). Typing during autosave, optimistic updates, or server reconciliation no longer causes lost characters, cursor jumps, or disappearing whitespace.

## Proposal

`docs/proposals/RFC-buffered-model-2.5.10-proposal.md`

## Impact

- No API changes
- No breaking changes
- Backward compatible
- Patch release
