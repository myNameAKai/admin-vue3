<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <Notification v-bind="filtersProps"></Notification>
      </span>
      <template #dropdown>
        <Lists :lists="lists" :actions="actions" :warpClass="warpClass" :warpStyle="warpStyle" v-bind="$attrs"
          v-on="forwardedEmits" />
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { AvatarProps, TabsPaneContext } from "element-plus";
import Lists from "./NoticeMessageList.vue"
import Notification from "./Notification.vue";
import type { MessageListItem, NoticeProps } from "./types";


const props = defineProps<NoticeProps>()

const emits = defineEmits<{
  clickAvatar: [avatar: Partial<AvatarProps>],
  clickItem: [item: MessageListItem],
  clickTab: [tab: TabsPaneContext, event: Event],
}>()

const forwardedEmits = {
  clickAvatar: (avatar: Partial<AvatarProps>) => emits('clickAvatar', avatar),
  clickItem: (item: MessageListItem) => emits('clickItem', item),
  clickTab: (tab: TabsPaneContext, event: Event) => emits('clickTab', tab, event)
}
const filtersProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { lists, actions, ...resetProps } = props
  return resetProps
})





</script>

<style scoped></style>, TabsPaneContextMessageListItem, import item from "element-plus/es/components/space/src/item";,
TabsPaneContext
