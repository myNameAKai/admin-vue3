<template>
  <div class="w-full h-full overflow-hidden flex">
    <!-- 左右布局 -->
    <!-- sidebar -->
    <div :style="{ width: typeof menuWidth === 'number' ? `${menuWidth}px` : `${menuWidth}` }" class="h-full bg-sky">
      <!-- menu -->
      <!-- menu2级 -->
      <el-scrollbar class="h-full">
        <!-- <menu :data="Menus" class="h-full"></menu> -->
        <Menu :data="Menus"></Menu>
      </el-scrollbar>
    </div>
    <div class="flex-1 h-full">
      <!-- header 主题 全屏 菜单 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem } from '@/components/Menu/type';
import type { RouteRecordRaw } from 'vue-router/auto';
import { routes } from 'vue-router/auto/routes'
console.log("🚀 ~ routes:", routes)
interface ThemeSettingsProps {
  menuWidth?: number | string
}

withDefaults(defineProps<ThemeSettingsProps>(), {
  menuWidth: 200
})

function generateMenus(routes: RouteRecordRaw[]): AppRouteMenuItem[] {
  const menus: AppRouteMenuItem[] = []
  routes.forEach((item) => {
    let menuItem: AppRouteMenuItem = {
      path: item.path,
      name: item.name,
      meta: item.meta,
      component: item.component,
      alias: typeof item.redirect === 'string' ? item.redirect : undefined
    }
    if (item.children && item.children.length) {
      menuItem.children = generateMenus(item.children)
    }
    menus.push(menuItem)
  })
  return menus
}

const Menus = computed(() => generateMenus(routes))
console.log("🚀 ~ Menus:", Menus)
</script>

<style scoped></style>
