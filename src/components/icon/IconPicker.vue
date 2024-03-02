<template>
    <div class="icon-picker">
        <!-- button icon -->
        <el-button @click="() => toggle(true)">
            <slot>
                选择图标
            </slot>
        </el-button>
        <!-- dialog -->
        <el-dialog v-model="show" :width="width" title="选择图标" center>
            <!-- icon list -->
            <IconList v-model="defaultActiveIcon" item-class="hover:bg-sky-100" icon-class="text-2xl" :show-text="false"
                @click="handleClick" activeClass="text-[#409EFF]"></IconList>
            <!-- setting -->
            <div class="my-4">
                <div class="flex mr-1">
                    <span class="pr-2 w-20">图标颜色</span>
                    <el-color-picker v-model="color" size="small" />
                </div>
                <div class="flex items-center flex-1 mr-1">
                    <span class="pr-2 w-20">图标大小</span>
                    <el-slider v-model="num" :step="1" size="small" show-input />
                </div>
                <!-- <el-input-number v-model="num" :step="1" size="small" /> -->
            </div>
            <div class="flex">
                <span> 选择的图标：</span>
                <Icon :icon="iconRef" :style="{ color, fontSize: `${num}px` }"></Icon>
                <span>{{ iconRef }}</span>
            </div>
            <template #footer>
                <el-button type="primary" @click="handlConfirm">确定</el-button>
                <el-button @click="() => toggle(false)">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { IconPickerSubmitProps } from "./types";
const [show, toggle] = useToggle()
const num = ref(16)
const color = ref("#409EFF")
const iconRef = ref("test")
const defaultActiveIcon = ref('ep:printer')
withDefaults(defineProps<{
    width?: string
}>(), {
    width: '75%'
})
const emits = defineEmits<{
    (e: "submit", i: IconPickerSubmitProps): void

}>()
function handleClick(i: string) {
    iconRef.value = i
}

function handlConfirm() {
    toggle(false)
    emits("submit", {
        icon: iconRef.value,
        color: color.value,
        fontSize: num.value
    })

}
</script>

<style scoped lang="scss">
.icon-picker {
    :deep(.el-dialog__body) {
        height: auto;
        max-height: 65vh;
        overflow-y: auto;
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>