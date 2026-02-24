# Taleswords UI Library Doctrine

Version: 1.0
Status: Architectural Baseline
Scope: @taleswords/lib-ui

---

# 1. Core Principles

1. Deterministic structure over stylistic preference.
2. Clear architectural layering with enforced dependency direction.
3. Domain isolation from reusable UI primitives.
4. Semantic token-driven styling.
5. Predictable contracts (v-model, props, emits).
6. Composition over inheritance.
7. Minimal breaking surface.

This doctrine defines non-negotiable architectural rules for the Taleswords UI system.

---

# 2. Layered Architecture

## 2.1 Foundation Layer (Primitives)

Definition:

* Atomic UI elements.
* Domain-agnostic.
* No store imports.
* No API calls.
* Minimal internal dependencies.

Examples:

* ButtonBase
* TextboxBase
* CheckboxBase
* CheckboxInput
* Radio
* Switch
* BadgeBase
* LoaderBase
* ProgressBar
* FormField

Rules:

* May import services/utils/* only.
* May depend on other primitives (max shallow depth).
* Must not import composed components.
* Must not import domain logic.

Purpose:
Stable building blocks reused everywhere.

---

## 2.2 Composed Layer

Definition:

* Assembles primitives into reusable UI systems.
* Still domain-agnostic.
* May use composables for generic behavior.

Examples:

* DropdownBase
* ModalBase
* TableBase
* ListBase
* FormBase
* CardBase
* TabsBase
* AccordionBase

Rules:

* May import primitives.
* May import other composed components.
* May import enum metadata (constants only).
* Must not import stores.
* Must not call APIs.

Purpose:
Reusable UI systems and orchestration patterns.

---

## 2.3 Domain Layer

Definition:

* Business-specific components.
* May import stores and orchestrate workflows.

Rules:

* Store imports define domain boundary.
* Domain components must not be placed inside lib-ui if lib-ui is domain-agnostic.

Purpose:
Application wiring only.

---

# 3. Dependency Direction Rules

Allowed:

* Foundation → Foundation (limited)
* Composed → Foundation
* Composed → Composed
* Domain → Composed
* Domain → Foundation

Forbidden:

* Foundation → Composed
* Foundation → Domain
* Composed → Domain (no store access)

Hard Boundary:
Any import from stores/* marks Domain.

---

# 4. Folder Taxonomy

lib-ui structure:

* inputs/
* info/
* forms/
* tables/
* lists/
* wrappers/
* features/

Complex components must contain a private components/ subfolder.
Subcomponents must never be imported externally.

---

# 5. Component Conventions

## 5.1 Base.vue Convention

Each system has a canonical Base.vue implementation.

Specialized components wrap Base.vue via composition and preset props.

No inheritance.

---

## 5.2 Data-Prop Bags

Complex wrappers use *Data object props:

Examples:

* buttonData
* dropdownData
* modalData
* tableData

These are spread via v-bind.

Purpose:

* Avoid prop explosion.
* Maintain forward compatibility.

---

# 6. Styling Doctrine

## 6.1 Token Architecture

Three layers:

Layer 1 — Raw palette

* --color-{family}-{shade}

Layer 2 — Semantic tokens

* --{component}-{property}-{state}

Layer 3 — Utilities

* Applied only via @apply inside <style scoped>

Rules:

* Components must use semantic tokens only.
* No raw hex values in components.
* No !important.
* No inline hardcoded colors.

---

## 6.2 BEM Convention (Mandatory)

We adopt BEM for CSS structure.

Structure:

Block:

* .button
* .textbox
* .dropdown

Element:

* .button__icon
* .textbox__input

Modifier:

* .button--primary
* .button--danger
* .textbox--error
* .dropdown--open

State:

* .is-disabled
* .is-loading
* .is-active

Rules:

* Flat selectors only.
* No deep nesting.
* No element tag selectors.
* Variants must attach to root block class.
* States must be explicit modifiers or state classes.

---

## 6.3 Interaction State Rules

Hover:

* Always gated with :not(:disabled)

Focus:

* Two-ring focus system (border + box-shadow)
* Token-driven

Disabled:

* Dedicated disabled tokens
* No opacity hacks

Error:

* Controlled via hasError prop
* Error modifier class applied at root

---

# 7. Input System Contract

## 7.1 v-model Pattern

All form-bound inputs must implement:

Prop:

* modelValue

Emit:

* update:modelValue

No defineModel.

---

## 7.2 Standard Props

Universal:

* isDisabled
* hasError

Textbox-only:

* isReadonly
* isLocked

---

## 7.3 Validation Architecture

Validation must be externalized in services/utils.

Validator shape:
{
hasError: Boolean,
message: String,
isValid: Function
}

FormField is responsible for error message rendering.

Inputs do not own validation logic.

---

# 8. Overlay Archetypes

## 8.1 Dropdown Pattern

* Local isOpen state
* Outside click detection
* DOM-based positioning
* Window resize + scroll recalculation

## 8.2 Modal Pattern

* Controlled via v-model
* Teleported to body
* Escape key closes (configurable)
* Overlay click closes (configurable)
* Scroll lock via body class

## 8.3 Accordion Pattern

* Parent owns expand map
* Provide/inject for expand-all
* Transition-based collapse

---

# 9. Data Display Doctrine

## 9.1 TableBase is Universal Engine

Features:

* Column schema-driven
* Local or API sort
* Local or API filter
* Selection model
* Optional virtual scrolling

Lists are specialized tables.

Specialization must occur via preset wrapper.

---

# 10. Composables Doctrine

Composables may exist for:

* Toast
* Banner
* Confirm modal
* Virtual scrolling
* Mobile detection

Rules:

* Singleton state allowed for global systems.
* No UI store imports inside composables.

---

# 11. Routing Abstraction

Clickable components must support:

* to → RouterLink
* href → <a>
* none → <button>

Navigation element resolution must be abstracted in a utility.

---

# 12. Non-Negotiables

1. No store imports in lib-ui primitives.
2. No API calls inside components.
3. Semantic tokens only.
4. BEM enforced.
5. No defineModel.
6. Composition only.
7. Base.vue pattern required.
8. Flat CSS specificity.

---

# 13. Enforcement Strategy

* PR review must validate layer boundaries.
* Lint rule recommended to block stores/* in lib-ui.
* Design tokens must be centralized.
* Breaking changes require version bump.

---

# 14. Outcome

This doctrine ensures:

* Structural predictability
* Reusability
* Theming consistency
* Clear domain separation
* Long-term maintainability

End of Doctrine.
