import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite';
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                {
                    '@/api/index': ['API'],
                },
            ],
            dts: 'src/auto-imports.d.ts',
        }),
        svgLoader()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000',
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true
            }
        }
    }
})
