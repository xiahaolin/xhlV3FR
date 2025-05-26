import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from "@vitejs/plugin-vue-jsx" // jsx
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'//按需自动加载API插件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect' // 文件追踪
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression'

//const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  server: {
    host: true,
  },
  base: './',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'pinia', 'axios'] // 常用依赖预构建
  },
  plugins: [
    vue(),
    vueDevTools(),
    vueJsx(),
    legacy({
      targets: ['Chrome >= 79'], // 只兼容 Chrome 79 及以上
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 处理 async/await 等
      modernPolyfills: true, // 自动按需引入 polyfill（推荐）
    }),
    viteCompression({
      algorithm: 'brotliCompress', // 或 gzip
    }),
    AutoImport({
      imports: ["vue", "vue-router", 'pinia'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      // 
      dirs: ['src/components', 'src/views'],
      // 解决命名冲突，加上下面这一行作为配置项即可
      directoryAsNamespace: true,
      //不想生成components.d.ts文件，需要设置为false
      dts: false,
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
