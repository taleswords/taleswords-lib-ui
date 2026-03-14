# lib-ui RFC Bundle

## Version: 2.5.10 — Input Editing Stabilization

---

# RFC 2.5.10 — Focus‑Aware Editing Stabilization for Form Inputs

## Status

Proposed — target **lib-ui v2.5.10**

---

# Motivation

Modern applications frequently rely on **autosave, optimistic updates, and reactive state synchronization**.

When form inputs are implemented as pure controlled components:

```
:value="modelValue"
@input="emit('update:modelValue', value)"
```

any external state update immediately replaces the displayed value in the input element.

This creates a poor editing experience in applications with autosave:

• characters typed during autosave can be lost
• cursor position jumps
• trailing whitespace disappears
• inputs feel "stuck" or "fighting" the user

Example failure case:

1. User types `"Like this "`
2. Autosave triggers
3. API response updates modelValue to `"Like this"`
4. Input re-renders
5. User continues typing → space disappears

This behavior is common in systems using:

• autosave
• optimistic updates
• collaborative editing
• server reconciliation

lib-ui currently provides **no editing-session awareness**, leaving applications to implement ad‑hoc fixes.

---

# Goal

Ensure **user typing always takes precedence over external state updates while the input is focused**.

External updates should only synchronize when the user is not actively editing.

Benefits:

• smooth typing experience
• stable cursor position
• autosave compatibility
• no lost characters

---

# Scope

All lib-ui form inputs that use `modelValue` must support buffered editing.

Target component groups:

```
inputs/textboxes/
inputs/selects/
inputs/checkboxes/
inputs/radios/
inputs/numbers/
inputs/date/
```

Primary example:

```
TextboxBase
```

---

# Proposed Behavior

Inputs maintain an **internal display buffer** during active editing.

While the field is focused:

```
external model updates are ignored
```

When the field blurs:

```
display value synchronizes with modelValue
```

This prevents autosave or store updates from overwriting in‑progress user input.

---

# Implementation Strategy

Instead of implementing buffering logic independently in every component, lib-ui introduces a reusable composable.

---

# RFC 2.5.11 — useBufferedModel() Composable

## Status

Proposed — target **lib-ui v2.5.10**

---

# Motivation

Multiple form components require identical buffering behavior.

Duplicating the logic across components would lead to:

• inconsistent implementations
• increased maintenance cost
• higher risk of subtle bugs

A composable ensures the behavior is implemented once and reused everywhere.

---

# Composable

```
useBufferedModel()
```

Location:

```
src/composables/useBufferedModel.ts
```

---

# Responsibilities

The composable manages:

• focus state
• buffered display value
• synchronization rules between modelValue and the displayed value

---

# API

```
const {
  displayValue,
  isFocused,
  onInput,
  onFocus,
  onBlur
} = useBufferedModel(props, emit)
```

---

# Behavior Rules

## Initialization

```
displayValue = modelValue
```

---

## External Model Updates

```
watch(modelValue)

if (!isFocused)
    displayValue = modelValue
```

External state updates only apply when the field is not focused.

---

## User Input

```
onInput(value)
    displayValue = value
    emit('update:modelValue', value)
```

Typing updates both the display buffer and the external model.

---

## Focus

```
onFocus()
    isFocused = true
```

---

## Blur

```
onBlur()
    isFocused = false
    displayValue = modelValue
```

When editing ends, the input resynchronizes with canonical state.

---

# Example Integration (TextboxBase)

Before:

```
<textarea
  :value="props.modelValue"
  @input="emit('update:modelValue', $event.target.value)"
/>
```

After:

```
const {
  displayValue,
  onInput,
  onFocus,
  onBlur
} = useBufferedModel(props, emit)
```

Template:

```
<textarea
  :value="displayValue"
  @input="onInput"
  @focus="onFocus"
  @blur="onBlur"
/>
```

---

# Affected Components

Components to adopt the composable:

```
TextboxBase
SelectBase
NumberInputBase
DateInputBase
TextareaBase
```

Checkbox and radio inputs do not require buffering but may adopt focus tracking for consistency.

---

# Compatibility

No public API changes.

Props unchanged:

```
modelValue
variant
placeholder
multiline
rows
maxlength
...
```

Emits unchanged:

```
update:modelValue
focus
blur
```

The change is purely internal behavior.

---

# Performance Impact

Minimal.

Per component:

• 2 refs
• 1 watcher

No measurable runtime overhead.

---

# Edge Cases

External programmatic updates during editing will not update the visible value until blur.

This is intentional because **active user input must take precedence over external updates**.

---

# Migration

No migration required.

Applications using lib-ui automatically benefit from improved autosave stability.

---

# Benefits

For application developers:

• autosave-safe inputs
• no lost characters during typing
• stable cursor position

For lib-ui:

• improved resilience of form components
• standardized input behavior across components

---

# Implementation Estimate

Composable implementation:

~25 LOC

Integration per component:

~5 LOC

Total effort:

~1–2 hours

---

# Version Target

```
lib-ui v2.5.10
```

Patch release since the public API remains unchanged.
