<template>
    <!-- tabs -->
    <el-tabs v-model="activeName" class="demo-tabs" :style="warpStyle" :class="warpClass" @tab-click="handleClickTab">
        <el-tab-pane :label="tabItem.title" :name="tabItem.title" v-for="(tabItem, Tindex) in lists" :key="Tindex">
            <ul>
                <li v-for="(item, index) in tabItem.contents" :key="index" class="cursor-pointer hover:bg-sky-100">
                    <!-- tas content -->
                    <el-row justify="center" align="middle">
                        <el-col :span="5" align="middle" @click="() => handleClickAvatar(item.avatar)" class="px-2">
                            <!-- 头像 -->
                            <el-avatar size="small" v-bind="item.avatar" />
                        </el-col>
                        <el-col :span="19" @click="() => handleClickItem(item)">
                            <el-row align="middle" class=" flex-nowrap! mb-1">
                                <!-- 通知标题 -->
                                <div class="line-clamp-1 mr-1">
                                    {{ item.title }}
                                </div>
                                <!-- 标签 -->
                                <el-tag v-if="item.tag" size="small" type="success" class="mr-2" effect="dark"
                                    v-bind="item.tagProps">
                                    {{ item.tag }}
                                </el-tag>
                            </el-row>
                            <el-row class="mb-1">
                                <!-- 通知内容 -->
                                <div class="text-sm mr-2 text-gray-300 line-clamp-2">
                                    {{ item.content }}
                                </div>
                            </el-row>
                            <el-row>
                                <!-- 通知时间 -->
                                <div class="text-sm text-gray-300">
                                    {{ item.time }}
                                </div>
                            </el-row>

                        </el-col>
                    </el-row>

                </li>

            </ul>

        </el-tab-pane>
    </el-tabs>
    <!-- button -->
    <div class="flex w-full justify-around border-t cursor-pointer">
        <div class="flex flex-1 items-center justify-center py-2 border-r hover:bg-sky-100"
            v-for="(action, index) in actions" :key="index" @click="action.click">
            <Iconify :color="action.color" :icon="action.icon" :style="action.style"></Iconify>
            <span class="ml-1">{{
        action.title }}</span>
        </div>

        <!-- <div class="flex flex-1 items-center justify-center hover:bg-sky-100">
                <More></More>
                <span class="ml-1">更多</span>
            </div> -->
    </div>
</template>

<script setup lang="tsx">
import type { AvatarProps, TabsPaneContext } from "element-plus"
import type { MessageListItem, NoticeMessageListProps } from "./types";

const props = defineProps<NoticeMessageListProps>()
onMounted(() => {
    console.log(props.warpClass);

})

const activeName = ref(props.lists[0].title || '')
const emits = defineEmits<{
    clickAvatar: [avatar: Partial<AvatarProps>],
    clickItem: [item: MessageListItem],
    clickTab: [tab: TabsPaneContext, event: Event],
}>()
function handleClickAvatar(avatar: Partial<AvatarProps>) {
    emits('clickAvatar', avatar)
}

function handleClickItem(item: MessageListItem) {
    emits('clickItem', item)
}

function handleClickTab(tab: TabsPaneContext, event: Event) {
    console.log("🚀 ~ handleClickTab ~ event:", event)
    console.log("🚀 ~ handleClickTab ~ tab:", tab)
    emits('clickTab', tab, event)
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
    padding-left: 20px;
}

:deep(.el-tabs__content) {
    padding-bottom: 20px;
}
</style>
