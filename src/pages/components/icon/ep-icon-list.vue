<template>
    <div class="flex justify-end mr-4">
        <el-checkbox label="复制icon组件" v-model="copyIconComponent" @change="console.log(copyIconComponent)" />
        <ElSwitch v-model="copyTypeFlag" class="mb-2" active-text="复制icon名称" inactive-text="复制SVG图标" />
        <!-- 隐藏文字显示文字 -->
        <ElSwitch v-model="showText" class="mb-2" active-text="显示文字" inactive-text="隐藏文字" />
    </div>
    <IconList @click="handleClick" :showText="showText"></IconList>
</template>

<script setup lang="ts">

import { ElMessage } from "element-plus";
import { loadIcon } from "@iconify/vue"

//  true 复制icon名称  false 复制SVG图标
const copyTypeFlag = ref(false)
const copyIconComponent = ref(false)

console.log("🚀 ~ copyIconComponent:", copyIconComponent)
const showText = ref(false)
const soure = ref('')
const { copy, copied } = useClipboard({ source: soure })


function objectToSvg(obj: any) {
    const {
        left,
        top,
        width,
        height,
        rotate,
        vFlip,
        hFlip,
        body
    } = obj
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left},${top}) rotate(${rotate}) ${vFlip ? 'scale(1,-1)' : ''} ${hFlip ? 'scale(-1,1)' : ''}">
        ${body}
        </svg>`
    return svgString
}


async function handleClick(i: string) {
    if (copyIconComponent.value) {
        soure.value = `<div class="i-${i}"></div>`
    } else if (copyTypeFlag.value) {
        soure.value = i
    } else {
        const res = await loadIcon(i)
        soure.value = objectToSvg(res)
    }
    copy()
    copied && ElMessage({
        message: '复制成功',
        type: 'success',
    })
}
</script>

<style scoped></style>