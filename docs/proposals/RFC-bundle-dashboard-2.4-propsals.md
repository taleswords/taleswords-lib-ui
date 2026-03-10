# lib-ui RFC Bundle

## Version: 2.4 — Dashboard Stabilization Proposals

### New RFCs: 2.4.4 – 2.4.8

---

# RFC 2.4.4 — FileInputBase / FileUpload Primitive

## Status

Implemented — v2.5.0

## Motivation

The UI component doctrine forbids raw HTML form controls in application code. However, **lib-ui currently provides no primitive for file input or upload workflows**, forcing downstream applications to use:

```
<input type="file">
```

This violates the doctrine and has appeared in multiple dashboard components.

Affected dashboard components:

* `ImageField.vue`
* `UploadAssetsDialog.vue`
* `ImportProjectDialog.vue`

A canonical file input primitive is required to eliminate raw DOM usage and standardize upload behavior.

---

## Proposal

Introduce a **FileInputBase** primitive.

Component name:

```
FileInputBase
```

Optional higher-level component:

```
FileUploadBase
```

---

## Responsibilities

FileInputBase must provide:

• File selection dialog
• Multiple file selection
• File type restrictions
• Event emission for selected files

Optional features:

• Drag-and-drop support
• Upload progress indicator
• File size validation

---

## Example API

```
<FileInputBase
  accept="image/*"
  multiple
  @files-selected="handleFiles"
/>
```

Event payload:

```
files: File[]
```

---

## Design Requirements

The component must:

• Hide native input UI
• Use lib-ui button styling
• Integrate with the existing token system
• Support keyboard accessibility

Implementation pattern:

```
<label>
  <input type="file" hidden>
  <ButtonBase>Select files</ButtonBase>
</label>
```

---

## Migration Plan

Dashboard replacements:

```
<input type="file">
```

→

```
<FileInputBase />
```

Affected dashboard files:

* ImageField.vue
* UploadAssetsDialog.vue
* ImportProjectDialog.vue

---

# RFC 2.4.5 — Narrative Typography Variant for TextboxBase

## Status

Implemented — v2.5.0

## Motivation

Narrative content must use the **narrative font stack** defined in typography doctrine:

```
--font-family-narrative
```

However **TextboxBase always renders using the UI font**, which makes it impossible to correctly display narrative text inside editor fields.

Affected dashboard components:

* `InspectorLine.vue`
* `InspectorDialogueEntry.vue`

These components edit **dialogue and narrative text**, which must visually match the narrative font.

---

## Proposal

Add a typography variant to **TextboxBase**.

Two possible API designs:

### Option A (preferred)

```
<TextboxBase variant="narrative" />
```

### Option B

```
<TextboxBase font="narrative" />
```

---

## Implementation

Variant applies:

```
font-family: var(--font-family-narrative);
```

Default remains:

```
font-family: var(--font-family-ui);
```

---

## Example

```
<TextboxBase
  variant="narrative"
  v-model="dialogue.text"
/>
```

---

## Benefits

• Narrative content visually matches player output
• Editor preview becomes accurate
• No need for downstream CSS overrides

---

# RFC 2.4.6 — Narrative Typography Utility

## Status

Implemented — v2.5.0

## Motivation

Applications sometimes render narrative text **outside of form inputs**, for example:

* dialogue preview panels
* story previews
* in-editor player simulation

While typography tokens exist, lib-ui provides **no reusable utility class** to apply narrative typography consistently.

This leads to duplicated CSS across applications.

---

## Proposal

Introduce a utility class:

```
.tw-narrative-text
```

---

## Definition

```
.tw-narrative-text {
  font-family: var(--font-family-narrative);
  font-size: var(--text-base);
  line-height: var(--line-relaxed);
}
```

---

## Example Usage

```
<div class="tw-narrative-text">
  {{ dialogueText }}
</div>
```

---

## Benefits

• Canonical narrative styling
• Eliminates custom CSS in applications
• Ensures typography consistency across projects

---

# RFC 2.4.7 — Border Radius Token Export

## Status

Implemented — v2.5.0

## Motivation

Multiple downstream components require border-radius tokens.

Current situation:

Applications are forced to define their own values:

```
--radius-sm: 4px
--radius-md: 6px
```

because lib-ui does not export a documented radius scale.

This breaks token consistency across projects.

---

## Proposal

Add a radius token scale to lib-ui.

Recommended tokens:

```
--radius-xs: 2px
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-pill: 999px
```

---

## Usage Examples

Buttons

```
border-radius: var(--radius-md);
```

Badges

```
border-radius: var(--radius-pill);
```

Panels

```
border-radius: var(--radius-lg);
```

---

## Benefits

• Removes raw radius values in applications
• Standardizes UI curvature
• Enables consistent visual language

---

# RFC 2.4.8 — Spacing Token Extension (2px Scale)

## Status

Implemented — v2.5.0

## Motivation

The lib-ui spacing scale currently starts at:

```
--space-xs: 4px
```

However several UI patterns require **micro spacing**, especially:

• badges
• icon overlays
• compact UI density modes
• grid badges
• editor overlays

Applications currently use raw values:

```
2px
```

which violates the spacing doctrine.

---

## Proposal

Extend spacing scale with a micro token:

```
--space-2xs: 2px
```

---

## Updated spacing scale

```
--space-2xs: 2px
--space-xs: 4px
--space-sm: 8px
--space-md: 12px
--space-lg: 16px
--space-xl: 24px
```

---

## Benefits

• Eliminates raw pixel spacing in applications
• Enables tighter UI density modes
• Preserves token discipline

---

# Impact Summary

Affected Projects

Dashboard editor UI

Expected improvements

• Removal of remaining doctrine violations
• Elimination of raw DOM form controls
• Correct narrative typography in editors
• Complete token coverage for spacing and radius

---

# Compatibility

All proposals are **additive**.

No breaking changes.

Existing components continue to function unchanged.

---

# Target Release

lib-ui **v2.5**
