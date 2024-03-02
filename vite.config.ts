import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import VueMacros from 'unplugin-vue-macros'

import { VueRouterAutoImports } from 'unplugin-vue-router'

import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'

import { VitePWA } from 'vite-plugin-pwa'

import { viteMockServe } from 'vite-plugin-mock'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// 过滤 element-plus的.mjs文件剔除不需要的locales
// 判断 /locales文件中对应的文件名作为过滤条件 =》 保留

function externalElementPlusLocales(id: string) {
  const localesDir = path.resolve(__dirname, 'locales')
  const localerDirFiles = fs.readdirSync(localesDir).map((file) => {
    return file.match(/([\w-]*)\.json$/)?.[1] || ''
  })

  if (id.includes('element-plus/dist/locale')) {
    // 获取判断id的basename在不在localerDirFiles中
    const basename = path.basename(id)
    return !localerDirFiles.some((file) => file.toLocaleLowerCase() === basename)
  }

  return false
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: (id) => externalElementPlusLocales(id)
    }
  },
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    // Vue3.3以后，不需要这些新的特性了
    // VueMacros.vite({
    //   plugins: {
    //     vue: vue(),
    //     vueJsx: vueJsx() // 如果需要
    //   }
    // }),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        // 'vue-router'
        VueRouterAutoImports,
        '@vueuse/core'
      ],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      // 允许子目录作为组件的命名空间前缀
      directoryAsNamespace: false,
      collapseSamePrefixes: true,
      resolvers: [ElementPlusResolver()]
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    VitePWA({
      manifest: {
        name: 'Vite App',
        short_name: 'Vite App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate'
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: false
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    }),
    VueI18nPlugin({
      /* options */
      include: path.resolve(__dirname, './locales/**'),
      // 说明: 由于配置了modules/i18n.ts, 默认为legacy为false，
      //所以禁止修改
      compositionOnly: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
