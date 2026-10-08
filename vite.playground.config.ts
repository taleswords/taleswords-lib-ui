import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// The playground as a static site (GitHub Pages). The library build stays in vite.config.ts.
// PLAYGROUND_BASE is the path the site is served under, e.g. /taleswords-lib-ui/.
export default defineConfig({
    root: path.resolve(__dirname, 'playground'),
    base: process.env.PLAYGROUND_BASE ?? '/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src/index.ts')
        }
    },
    build: {
        outDir: path.resolve(__dirname, 'playground-dist'),
        emptyOutDir: true,
    }
})
