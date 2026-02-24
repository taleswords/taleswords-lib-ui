import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    // Ignores
    { ignores: ['node_modules/**', 'dist/**', 'old-react-app/**'] },

    // Base JS recommended
    js.configs.recommended,

    // TypeScript recommended (type-aware disabled for speed)
    ...tseslint.configs.recommended,

    // Vue recommended
    ...pluginVue.configs['flat/recommended'],

    // Let TypeScript parser handle <script> in .vue files
    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },

    // ── Browser globals for source files ──
    {
        files: ['src/**/*.{ts,vue}'],
        languageOptions: {
            globals: {
                window: 'readonly',
                document: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                Node: 'readonly',
                Event: 'readonly',
                MouseEvent: 'readonly',
                KeyboardEvent: 'readonly',
                FocusEvent: 'readonly',
                HTMLInputElement: 'readonly',
                HTMLTextAreaElement: 'readonly',
                ResizeObserver: 'readonly',
                MutationObserver: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                console: 'readonly',
            },
        },
    },

    // ── Layer boundary enforcement (src/ only) ──
    {
        files: ['src/**/*.{ts,vue}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        { group: ['pinia', 'pinia/*'], message: 'lib-ui must not import backend dependencies' },
                        { group: ['stores/*'], message: 'lib-ui must not import backend dependencies' },
                        { group: ['axios', 'axios/*'], message: 'lib-ui must not import backend dependencies' },
                    ],
                },
            ],
            'no-restricted-globals': [
                'error',
                { name: 'fetch', message: 'lib-ui must not make API calls' },
            ],
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.name='defineModel']",
                    message: 'Use defineProps + defineEmits instead',
                },
            ],
        },
    },

    // ── Relax rules that conflict with project conventions ──
    {
        files: ['src/**/*.{ts,vue}', 'playground/**/*.{ts,vue}', 'tests/**/*.ts'],
        rules: {
            // Vue component name rule — single-word component names are fine
            'vue/multi-word-component-names': 'off',
            // Allow unused vars prefixed with _
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            // The project uses 4-space indentation in templates
            'vue/html-indent': 'off',
            // The project uses inline attributes
            'vue/max-attributes-per-line': 'off',
            // Allow single-line elements
            'vue/singleline-html-element-content-newline': 'off',
            // Allow self-closing for non-void elements
            'vue/html-self-closing': 'off',
            // Allow v-for template refs
            'vue/no-unused-vars': 'off',
            // Triple-slash reference is used for globals.d.ts
            '@typescript-eslint/triple-slash-reference': 'off',
            // False positives on switch-case initialization patterns
            'no-useless-assignment': 'off',
            // Optional props don't need defaults — TypeScript handles it
            'vue/require-default-prop': 'off',
            // Attribute ordering is a style preference, not enforced
            'vue/attributes-order': 'off',
            // Prop-with-default pattern used intentionally
            'vue/no-required-prop-with-default': 'off',
            // Spacing in self-closing tags — project uses compact style
            'vue/html-closing-bracket-spacing': 'off',
            // Inline content in multiline elements is fine
            'vue/multiline-html-element-content-newline': 'off',
        },
    },
]
