import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src/index.ts')
        }
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'styles',
        },
        rollupOptions: {
            external: ['vue'],
        },
    }
})
