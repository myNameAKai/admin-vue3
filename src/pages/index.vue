<template>
  <div>home</div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <Icon icon="bi:1-circle" class="text-5xl text-sky-500 w-8 h-8" />
  <component :is="Icon" :icon="iconRef"></component>
  <SvgIcon type="weizhi" class="w-8 h-8 text-red"></SvgIcon>
  <!-- <i class="iconfont icon-cangku text-red-5"></i> -->
  <!-- <Neticon type="" url="//at.alicdn.com/t/c/font_4440590_lfenwi7ww6l.css"></Neticon> -->
  <IconFontIcon type="weizhi"></IconFontIcon>
  <!-- <IconList></IconList> -->
  <Iconify icon="bi:1-circle"></Iconify>
</template>

<script setup lang="ts">
import { Icon, loadIcons, addAPIProvider } from '@iconify/vue';
import { registerSW } from 'virtual:pwa-register'
// import json from "@iconify/json/json/mdi.json"
import json from "../../public/bi.json"
const arr = Object.keys(json.icons)
const iconRef = ref(arr[0])

// 从本地加载
addAPIProvider('lcoal', {
  // Array of host names.
  // Mutliple hosts allow redundancy: if one host is down, component will query another host.
  resources: ['http://localhost:5173'],
});
// onBeforeMount(() => {
//   loadIcons(arr.map((item) => `${json.prefix}:${item}`))
// })
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
