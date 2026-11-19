# Release Notes — @taleswords/lib-ui 2.7.0

**Type:** Minor

Proposal: `docs/proposals/2.7.0-rfc-bundle-tabs-date-height-radio.md` (RFCs A to D; taleswords-web cards #1452, #1453, #1454, #1455).

---

## Summary

Four changes from one design (the superadmin's story-check verdicts list): a tab row that no longer loses tabs on a narrow screen, a date input, one height for the controls that stand in a row, and a radio and checkbox whose resting ring can be seen.

No prop, event, slot or token was removed or renamed. No consumer code has to change.

## TabsBase: an overflowing row scrolls and shows it (RFC A)

- When the tabs are wider than the row, the row scrolls sideways (touch, trackpad, shift+wheel). No scrollbar is shown.
- An edge with tabs beyond it fades and shows a chevron; pressing anywhere in the 40 px edge scrolls the row. The edges are pointer and touch conveniences: they are not tab stops and are hidden from assistive technology. The keyboard keeps Arrow, Home and End.
- The selected tab is scrolled into view on mount and whenever the selection changes, and stays clear of the faded edge.
- The indicator follows its tab while the row scrolls and is recomputed on resize.
- **The tab now has a focus ring** (2 px, `--general-focus-ring`, drawn inside the tab). It had none.
- A row that fits is unchanged: no edge, no scroll, no layout shift.

New token: `--tabs-edge-icon-color`.

## TextboxBase: the `date` type (RFC B)

```vue
<TextboxBase v-model="from" type="date" min="2026-11-01" max="2026-11-30" />
```

- Renders the browser's own date input and picker. The value is the ISO string `YYYY-MM-DD`, or `''` when empty. What the user sees follows the browser's locale.
- New optional props `min?: string` and `max?: string`, bound to the input (never to a textarea).
- The picker follows the theme. New token: `--textbox-color-scheme`.
- No date library and no calendar component were added.

## One control height (RFC C)

A single-line TextboxBase (any type, `date` included) and a DropdownBase trigger now stand at one height: **46 px**, 43 px at the compact density.

New tokens: `--control-line-height` (1.5rem), `--control-height`.

**What moves:**

| Control | Before | After |
| --- | --- | --- |
| DropdownBase trigger | 44.5 px | 46 px |
| Single-line textbox, consumer resets input line-height (Tailwind preflight; the dashboard) | 46 px | 46 px |
| Single-line textbox, no such reset (lib-ui alone) | 42 px | 46 px |
| Multiline textbox | unchanged | unchanged |

Text sizes are unchanged (textbox 16 px, dropdown 15 px).

## Radio and Checkbox: the resting ring meets 3:1 (RFC D)

The unchecked ring was 1.33:1 to 1.54:1 against its ground. `--radio-border` and `--checkbox-border` now point at a new mid grey per theme:

| Palette colour | Value | on the page | on a card |
| --- | --- | --- | --- |
| `--color-neutral-950` (light) | #8C8C8C | 3.22:1 | 3.08:1 |
| `--color-nord-control-border` (dark) | #7D869E | 3.68:1 | 3.17:1 |

Checked, hover, error, disabled and focus colours are unchanged. A token test (`src/__tests__/styles/contrast.test.ts`) resolves the real token files and fails if either ring drops below 3:1.

The color doctrine gains one line under Contrast Rules: a control's resting boundary is at least 3:1 against the surface it stands on.

## Measured and left as they are

- **Field borders** (textbox, dropdown trigger, file upload): 1.53:1 on white. A field is also identified by its filled surface; darkening every field border is a design decision of its own.
- **Switch, off:** the track is 1.67:1 (light) and 1.74:1 (dark) against the page.

## Tests

- Unit: 477 tests (452 before): TabsBase overflow, the date type, the contrast test.
- Contract (Playwright, real layout): `tests/contracts/tabs.spec.ts` (13) and `tests/contracts/control-height.spec.ts` (5), all passing.
- Known, unchanged from 2.6.0: the four older contract specs (dropdown, modal, notifications, table) fail because they open routes the playground no longer serves (`/modals`, now `/lib/modals`); `npm run lint` reports 5 errors and `npm run typecheck` 2, none in files this release touches.
