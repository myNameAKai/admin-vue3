<template>
    <!-- item start -->
    <!-- 单item -->
    <el-menu-item :index="getIndex(data)" :disabled="data.meta?.disabled" v-if="!data.meta?.icon">{{
        data.meta?.title
    }}</el-menu-item>
    <template v-else>
        <!-- 折叠 -->
        <el-menu-item v-if="collapse" :index="getIndex(data)" :disabled="data.meta?.disabled">
            <Iconify :icon="data.meta?.icon" :class="iconStyles.class" :style="iconStyles.style"></Iconify>
            <template #title>{{ data.meta?.title }}</template>
        </el-menu-item>
        <!-- 侧栏 -->
        <el-menu-item v-else :index="getIndex(data)" :disabled="data.meta?.disabled">
            <Iconify :icon="data.meta?.icon" :class="iconStyles.class" :style="iconStyles.style"></Iconify>
            <span>{{ data.meta?.title }}</span>
        </el-menu-item>
        <!-- item end -->
    </template>
</template>

<script setup lang="ts">
import type { AppRouteMenuItem, IconOptions } from './type';
import { useMenu } from './useMenu'

// import Icon from '@/components/icon/Icon.vue'

interface MenuItemProps {
    data: AppRouteMenuItem
    collapse?: boolean
}

defineProps<MenuItemProps>()
const { getIndex } = useMenu()

const iconStyles = inject('iconProps') as IconOptions
</script>

<style scoped></style>