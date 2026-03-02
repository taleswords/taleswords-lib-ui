# Release Notes — @taleswords/lib-ui 2.3.0

> Documentation & governance release. No API changes. No breaking changes. No migration required.

---

## Spacing & Density Foundation Page

A dedicated playground page has been added under **Foundation > Spacing & Density** (`/lib/spacing-density`), formalizing the density architecture introduced in 2.2.0.

### Page sections

**Scale** — Visual reference for the 5-tier spacing token scale:

| Token | CSS Variable | Base Value |
|-------|-------------|-----------|
| XS | `--space-xs` | 4px |
| SM | `--space-sm` | 8px |
| MD | `--space-md` | 12px |
| LG | `--space-lg` | 16px |
| XL | `--space-xl` | 20px |

Includes bar chart visualization and padding block demo using live token values.

**Scaling** — Side-by-side comparison of default (`--density-scale: 1`) vs compact (`--density-scale: 0.85`) density, demonstrating proportional scaling is preserved across all token tiers.

**Propagation** — Composite example with `ButtonBase`, `TextboxBase`, `BadgeBase`, and `FormField` rendered in both density modes, confirming systemic propagation with zero hardcoded values.

---

## Playground Infrastructure

- New **Foundation** navigation category added to the playground sidebar, positioned before Inputs.
- `SECTION_ORDER` expanded with `Scale`, `Scaling`, and `Propagation` section types for foundation-level pages.

---

## Stats

- 4 files changed
- 404 tests passing (unchanged from 2.2.0)
- Zero API changes
- Zero breaking changes
