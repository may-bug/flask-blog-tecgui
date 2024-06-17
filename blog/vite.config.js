import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'global': 'globalThis' // 将 global 定义为 globalThis
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                // target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                },
                entryFileNames: `js/[name].[hash].js`,
                assetFileNames: `[ext]/[name].[hash].[ext]`,
                chunkFileNames: () => {
                    return `js/[name].[hash].js`
                }
            }
        }
    }
})
