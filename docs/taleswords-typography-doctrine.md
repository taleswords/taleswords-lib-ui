# Taleswords Typography Doctrine

## 1. Purpose

Typography in Taleswords is not decorative. It encodes product identity and structural hierarchy.

Taleswords is a narrative authoring tool. The system must clearly separate:

* **Narrative content** (creative prose)
* **Structural UI** (editor controls, data management, navigation)

Typography is the primary mechanism for this separation.

This doctrine defines strict rules for font usage, token layering, and component mapping.

---

## 2. Font System

Taleswords uses a **two‑font architecture**.

### 2.1 UI Font (Structural Layer)

Used for:

* Buttons
* Forms
* Labels
* Tables
* Navigation
* Side panels
* Modals
* Canvas node headers
* Metadata text

**Font:** Source Sans Pro
**Role:** Neutral, precise, invisible

Token:

```
--font-family-ui: 'Source Sans Pro', system-ui, -apple-system, sans-serif;
```

---

### 2.2 Content Font (Narrative Layer)

Used for:

* Line node dialogue text
* Player runtime dialogue body
* Scene descriptions
* Dialogue descriptions
* Long‑form story previews

**Font:** Lora
**Role:** Literary, expressive, immersive

Token:

```
--font-family-content: 'Lora', Georgia, serif;
```

---

## 3. Global Typography Tokens

### 3.1 Base Scale

```
--font-size-xs
--font-size-sm
--font-size-md
--font-size-lg
--font-size-xl
--font-size-2xl
```

### 3.2 Font Weights

```
--font-weight-regular
--font-weight-medium
--font-weight-semibold
--font-weight-bold
```

### 3.3 Line Heights

```
--line-height-tight
--line-height-normal
--line-height-relaxed
```

---

## 4. Semantic Typography Tokens

Components must NOT use raw font sizes or families.
All typography must go through semantic tokens.

### 4.1 UI Semantic Tokens

```
--button-font-family
--button-font-size
--button-font-weight

--input-font-family
--input-font-size

--form-label-font-family
--form-label-font-size
--form-label-font-weight

--table-header-font-family
--table-header-font-size
--table-header-font-weight

--table-cell-font-family
--table-cell-font-size

--modal-title-font-family
--modal-title-font-size
--modal-title-font-weight
```

All UI tokens reference:

```
var(--font-family-ui)
```

---

### 4.2 Narrative Semantic Tokens

```
--dialogue-text-font-family
--dialogue-text-font-size
--dialogue-text-line-height

--scene-description-font-family
--scene-description-font-size
--scene-description-line-height

--player-dialogue-font-family
--player-dialogue-font-size
--player-dialogue-line-height
```

All narrative tokens reference:

```
var(--font-family-content)
```

Narrative line-height must be:

```
var(--line-height-relaxed)
```

---

## 5. Global Defaults

In base.css:

```
body {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
}
```

Narrative areas must explicitly switch to content font via semantic tokens.

---

## 6. Canvas Node Typography Rules

Canvas nodes contain two typographic zones:

### 6.1 Structural Zone

* Node type label
* Character name
* Metadata

Must use UI font.

### 6.2 Narrative Zone

* Line node text content

Must use content font.

This separation visually reinforces:

* System structure (UI font)
* Story content (Content font)

---

## 7. Runtime Player Typography

Runtime player must visually emphasize narrative immersion.

Rules:

* Character name → UI font, medium weight
* Dialogue body → Content font, relaxed line height
* Choice buttons → UI font

This ensures structural clarity while preserving emotional tone.

---

## 8. Hard Constraints

1. No component may define:

   * `font-family` directly
   * Raw `px` font-size values
   * Inline font styles
2. No third font family may be introduced.
3. Raleway is not part of the system.
4. All typography must reference semantic tokens.
5. Dark mode does NOT change font families.
6. Content font must never be used for structural UI elements.

---

## 9. Identity Statement

Taleswords typography expresses:

* Structural precision (Source Sans Pro)
* Narrative immersion (Lora)

The system must always make clear:

**What is system.**
**What is story.**

Typography is the boundary.

---

End of Doctrine.
