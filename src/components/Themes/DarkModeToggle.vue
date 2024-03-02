<template>
    <div>
        <el-switch style="--el-switch-on-color: #333" v-model="isDark" :inactive-action-icon="sun"
            :active-action-icon="moon" />
    </div>
</template>

<script setup lang="tsx">

const props = defineProps({
    dark: {
        type: Boolean,
    }
})

const sun = () => <i class="i-line-md:sun-rising-loop"></i>
const moon = () => <i class="i-line-md:moon-rising-loop"></i>
// useDark 会即刻改变组件的状态重新渲染 过渡效果会失效
// const isDark = useDark()
// const isDark = ref(props.dark)
const isDark = useStorage('dark-mode-flag', props.dark)
const preferredDark = usePreferredDark()
function modeToggle(flag: boolean) {
    if (flag) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

// 如果没有传入了dark属性 则跟随系统
onMounted(() => {
    console.log("🚀 ~ props:", props)
    if (typeof isDark.value === 'undefined' && !props.dark) {
        modeToggle(preferredDark.value)
        isDark.value = preferredDark.value
    }
})
watch(isDark, () => {
    modeToggle(isDark.value)
}, {
    immediate: true
})

// 跟随系统
watch(preferredDark, () => {
    modeToggle(preferredDark.value)
    isDark.value = preferredDark.value
})
</script>

<style scoped></style>