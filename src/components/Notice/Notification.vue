<template>
    <div>
        <el-badge :value="value" class="item"
            :style="{ '--a-notice-color': color, '--a-notice-size': `${size}px`, ...transformData }">
            <Icon :icon="icon" :style="{ fontSize: `${iconSize}px`, color: iconColor }"></Icon>
        </el-badge>
    </div>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/Iconify.vue"
import type { NotificationProps } from "./types";


const props = withDefaults(defineProps<NotificationProps>(), {
    icon: 'ep:bell',
    value: 0,
    iconSize: 18,
    iconColor: '#333',
    color: 'var(--el-color-danger)',
    size: 12,
    scale: 1
})


function calculeTransform(scale: number) {
    // 定义scale和translateX的范围
    const minScale = 0.4
    const maxScale = 1
    const minTranslateX = 75 // 单位:%
    const maxTranslateX = 100 // 单位:%
    // 计算translateX的值
    const translateX = minTranslateX + (maxTranslateX - minTranslateX) * ((scale - minScale) / (maxScale - minScale))
    return {
        '--a-translate-x': `${translateX}%`,
        '--a-scale': scale
    }
}

const transformData = computed(() => {
    console.log("🚀 ~ transformData ~ transformData:", calculeTransform(props.scale))
    return calculeTransform(props.scale)
})
</script>

<style scoped lang="scss">
$color: var(--a-notice-color);
$size: var(--a-notice-size);
$translateX: var(--a-translate-x);
$scale: var(--a-scale);

:deep(.el-badge__content) {
    background-color: $color;
    font-size: $size;
    transform: translateY(-50%) translateX($translateX) scale($scale);
}
</style>