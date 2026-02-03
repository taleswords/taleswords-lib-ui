# @taleswords/lib-ui

Vue 3 UI component library for Taleswords.

## Installation

### From npm (published)

```bash
npm install @taleswords/lib-ui
```

### Local Development (npm link)

If developing locally alongside another project:

```bash
# In this library directory
npm link

# In your Vue 3 project
npm link @taleswords/lib-ui
```

## Setup in Vue 3 + TypeScript + Tailwind Project

### 1. Import Styles

Add the CSS import to your `main.ts` **before** mounting the app. Import order matters with Tailwind:

```ts
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import lib-ui styles BEFORE your app styles / Tailwind
import '@taleswords/lib-ui/style.css'

// Your Tailwind / app styles
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

### 2. Register Components

**Option A: Global Registration (Plugin)**

Register all components globally in `main.ts`:

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import LibUiPlugin from '@taleswords/lib-ui'
import '@taleswords/lib-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(LibUiPlugin)
app.mount('#app')
```

Then use components anywhere without importing:

```vue
<template>
    <UiButton variant="primary">Click me</UiButton>
</template>
```

**Option B: Per-Component Import (Tree-Shaking)**

Import only what you need in each component:

```vue
<script setup lang="ts">
import { UiButton } from '@taleswords/lib-ui'
</script>

<template>
    <UiButton variant="primary">Click me</UiButton>
</template>
```

### 3. TypeScript Configuration

No extra configuration needed. Types are included automatically.

Import types when needed:

```ts
import type { UiButtonProps } from '@taleswords/lib-ui'
```

## Using with Tailwind CSS

The library uses CSS custom properties and scoped styles, so it works alongside Tailwind without conflicts.

### Combining with Tailwind Classes

You can add Tailwind utility classes directly to components:

```vue
<template>
    <UiButton variant="primary" class="mt-4 shadow-lg">
        Submit
    </UiButton>
</template>
```

### Using Only CSS Variables

If you only want the design tokens for use with Tailwind:

```ts
// main.ts
import '@taleswords/lib-ui/variables.css'
```

Then reference variables in your Tailwind config or CSS:

```css
.my-custom-button {
    background-color: var(--ui-primary-btn);
    color: var(--ui-text-color);
}
```

Or extend Tailwind with the variables:

```js
// tailwind.config.js
export default {
    theme: {
        extend: {
            colors: {
                'ui-primary': 'var(--ui-primary-btn)',
                'ui-danger': 'var(--ui-button-danger)',
            }
        }
    }
}
```

## Styles

The library provides three CSS entry points:

| Import | Size | Description |
|--------|------|-------------|
| `@taleswords/lib-ui/style.css` | ~10KB | Complete styles (variables + base + components) |
| `@taleswords/lib-ui/variables.css` | ~3KB | CSS custom properties only |
| `@taleswords/lib-ui/base.css` | ~7KB | Base element styles (requires `.ui-base` wrapper) |

### Base Styles

Base styles apply to elements within `.ui-base` wrapper:

```vue
<template>
    <div class="ui-base">
        <h1>Styled heading</h1>
        <form>
            <label class="required">Email</label>
            <input type="email" />
            <button class="primary">Submit</button>
        </form>
    </div>
</template>
```

## Components

### UiButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'default'` | Button style variant |
| `disabled` | `boolean` | `false` | Disables the button |

```vue
<template>
    <UiButton>Default</UiButton>
    <UiButton variant="primary">Primary</UiButton>
    <UiButton variant="secondary">Secondary</UiButton>
    <UiButton variant="danger">Delete</UiButton>
    <UiButton disabled>Disabled</UiButton>
</template>
```

## Customizing Theme

Override CSS variables in your app:

```css
/* In your global CSS or Tailwind @layer base */
:root {
    --ui-primary-btn: #3B82F6;
    --ui-primary-btn-hover: #2563EB;
    --ui-text-color: #1F2937;
}
```

See `src/styles/variables.css` for all available variables.

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start playground
npm run build    # Build library
npm run typecheck # Type check
```

## License

MIT
