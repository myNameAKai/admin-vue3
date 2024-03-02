<template>
  <div>home</div>
  <el-row class="mb-4">
    <!-- 现在的模式是:{{ isDark ? '暗黑模式' : '白天模式' }}
    <el-button type="primary" @click="handleClick">模式</el-button> -->
    <DarkModeToggle :dark="false"></DarkModeToggle>
    <div class="bg-red-500 dark:bg-sky-400 w-20 y-20"></div>
  </el-row>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register'

// 从本地加载
// addAPIProvider('lcoal', {
//   // Array of host names.
//   // Mutliple hosts allow redundancy: if one host is down, component will query another host.
//   resources: ['http://localhost:5173'],
// });
const isDark = useDark()
const toggleDark = useToggle(isDark)
function handleClick() {
  toggleDark()

}
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
