<template>
    <i :class="className"></i>
</template>

<script setup lang="ts">
import type { NeticonProps } from './types';

// const props = defineProps({
//     url: {
//         type: String,
//         default: ''
//     },
//     fontFmily: {
//         type: String,
//         default: 'iconfont'
//     },
//     fontClass: {
//         type: String,
//         default: 'icon-'
//     },
//     type: {
//         type: String,
//         default: ''
//     }
// })
const props = withDefaults(defineProps<NeticonProps>(), {
    url: '',
    fontFamily: 'iconfont',
    fontClass: 'icon-',
    type: ''
})

onBeforeMount(() => {
    // 判断引入的iconfont样式 是否存在
    // 不存在则创建link
    if (props.url) {
        const existingLink = document.querySelector(`link[href="${props.url}"]`)
        if (!existingLink) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = props.url
            document.head.appendChild(link)
        }

    }
})

// 计算传递来的样式
const className = computed(() => {
    return `${props.fontFamily} ${props.fontClass}${props.type}`
})


</script>

<style scoped></style>