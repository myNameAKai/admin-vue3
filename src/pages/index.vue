<template>
  <div>home</div>
  <el-row class="mb-4">
    <Menu mode="vertical" :data="data" class="w-[600px]">

    </Menu>
  </el-row>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem } from '@/components/Menu/type';
import { loadLocaleMessages } from '@/modules/i18n';
import { registerSW } from 'virtual:pwa-register'
// import { useI18n } from "vue-i18n"
// const { t: $t, locale: Locale } = useI18n()
// 从本地加载
// addAPIProvider('lcoal', {
//   // Array of host names.
//   // Mutliple hosts allow redundancy: if one host is down, component will query another host.
//   resources: ['http://localhost:5173'],
// });
const locale = ref('en')
watch(locale, () => {
  loadLocaleMessages(locale.value)
})
const isDark = useDark()
const toggleDark = useToggle(isDark)

const data: AppRouteMenuItem[] = [
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页',
      layout: 'default',
      order: 1,
      icon: 'ep:apple',
      hideMenu: false,
      disabled: false
    },
    children: [
      {
        name: 'About',
        path: '/home/about',
        meta: {
          title: '关于我们',
          layout: 'default',
          order: 2,
          // icon: 'info',
          hideMenu: false,
          disabled: false
        },
        children: [
          {
            name: 'Contact',
            path: '/home/about/contact',
            meta: {
              title: '联系我们',
              layout: 'default',
              order: 3,
              // icon: 'phone',
              hideMenu: false,
              disabled: false
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: {
      title: '大屏',
      layout: 'default',
      order: 4,
      icon: 'ep:bell',
      hideMenu: false,
      disabled: false
    }
  }
]

onMounted(() => {
  // setInterval(() => {
  //   iconRef.value = "@lcoal:bi:" + arr[Math.floor(Math.random() * arr.length)]
  // }, 1000)
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      setInterval(() => {
        registration && registration.update()
      }, 3600000)
    }
  })
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>
