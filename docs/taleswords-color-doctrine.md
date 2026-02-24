# 🎨 Taleswords Color Doctrine v1

**Primary = Gold**

---

# 1. Philosophy

Taleswords is a narrative creation tool, not a dashboard.

The color system must feel:

* Warm
* Calm
* Structured
* Intentional
* Non-aggressive
* Non-gamified

Gold is the interaction authority.
Blue is informational.
Red is destructive only.

No color may bleed across semantic boundaries.

---

# 2. Role Hierarchy (Non-Negotiable)

| Role                     | Purpose                       | Emotional Meaning            | Allowed Usage                                  |
| ------------------------ | ----------------------------- | ---------------------------- | ---------------------------------------------- |
| **Primary (Gold)**       | User action & selection       | Creative intent, affirmation | CTA buttons, checked states, active navigation |
| **Accent (Blue)**        | Information & system guidance | Neutral clarity              | Links, focus ring, info alerts                 |
| **Neutral (Gray)**       | Structure & layout            | Calm stability               | Surfaces, borders, secondary actions           |
| **Danger (Red)**         | Destructive / error           | Risk                         | Delete, validation error                       |
| **Success (Teal/Green)** | Completion                    | Positive outcome             | Success alerts, progress completion            |
| **Warning (Amber)**      | Attention                     | Caution                      | Warning banners                                |
| **Info (Blue variant)**  | Contextual info               | Informational                | Toast/Banner info only                         |

---

# 3. Gold is the Interaction Color

## Gold MUST be used for:

* Primary buttons
* Checkbox checked
* Radio checked
* Switch on state
* Active pagination
* Active tab indicator
* Selected table row
* Active navigation button
* Selected dropdown item (when applicable)
* Progress primary fill

## Gold MUST NOT be used for:

* Errors
* Link hover
* Headings
* Informational alerts
* Hover-only effects

Gold represents user commitment.

---

# 4. Blue is Informational Only

Blue MUST be used for:

* Focus ring
* Links
* Info alerts
* Non-destructive highlight states

Blue MUST NOT be used for:

* Checked states
* Primary CTA buttons
* Active navigation
* Tab active indicator
* Selection markers

Blue communicates system guidance, not user action.

---

# 5. Danger (Red) Isolation

Red MUST only appear in:

* Error states
* Destructive buttons
* Validation borders
* Critical alerts

Red MUST NOT appear in:

* Headings
* Link hover
* Ghost button hover
* Decorative accents

No cross-pollination allowed.

---

# 6. Disabled State Doctrine

Opacity hacks are forbidden.

All disabled states must:

* Use dedicated semantic tokens
* Have defined background, text, and border tokens
* Preserve legibility
* Preserve structure

Disabled must feel:

* Inactive
* Calm
* Not broken
* Not translucent

---

# 7. Surface Hierarchy

## Light Mode

| Layer    | Token             | Visual Role         |
| -------- | ----------------- | ------------------- |
| Page     | --general-body-bg | Base canvas         |
| Card     | --general-card-bg | Elevated surface    |
| Input    | --textbox-bg      | Interactive surface |
| Dropdown | --dropdown-bg     | Floating surface    |

Rules:

* Input background must not equal page background.
* Elevation must be subtle but readable.
* Borders must support surface definition, not compensate for missing contrast.

## Dark Mode

* Uses Nord palette.
* Text contrast must be > 7:1 wherever possible.
* Shadows slightly intensified compared to light mode.

---

# 8. Contrast Rules (Mandatory)

* All interactive text ≥ 4.5:1 contrast
* Destructive buttons must pass AA normal text
* Badges must pass AA normal text
* Focus ring must be visible on all surfaces
* Disabled elements exempt from AA but must remain readable

No exceptions.

---

# 9. Token Layer Discipline

## Layer 1 — Palette

Raw colors only.

No semantic meaning.

## Layer 2 — Semantic Tokens

Component-level tokens only reference palette.

No hex values allowed in tokens.css.
No hex values allowed in tokens-dark.css.

All rgba values must derive from palette variables.

---

# 10. Interaction State Matrix

Every interactive control must define:

* default
* hover
* active
* focus
* disabled
* error (if applicable)

Hover must never change semantic family.

Example:

Primary button hover → darker gold
NOT → red
NOT → blue

---

# 11. Selection Consistency Rule

Checkbox, Radio, Switch must use the SAME checked color.

No mixing gold and blue across similar controls.

---

# 12. Navigation Consistency Rule

Active navigation = gold.
Hover navigation = subtle neutral or gold tint.
Never danger.
Never blue.

---

# 13. Link Doctrine

Links:

* Default: blue
* Hover: darker blue
* Active: darker blue
* Never red
* Never gold

Links represent information, not commitment.

---

# 14. Badge Doctrine

Badges must:

* Pass contrast
* Use darker backgrounds for white text
* Never rely on pastel background + white text

If pastel is used, text must be dark.

---

# 15. Visual Tone Objective

The UI should feel:

* Authorial
* Warm
* Structured
* Literary
* Intentional
* Not corporate-blue SaaS
* Not gamified neon

Gold provides warmth.
Neutrals provide structure.
Blue provides clarity.
Red is rare and serious.

---

# Target Tone Coherence

Pre-doctrine: 6 / 10
Target: 9 / 10
