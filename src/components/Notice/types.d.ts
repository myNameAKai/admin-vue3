import type { IconifyIcon } from '@iconify/vue'
import type { BadgeProps, TagProps, AvatarProps } from 'element-plus'
import type { IconProps } from '@iconify/vue'
import type { CSSProperties } from 'vue'
export interface NotificationProps extends Partial<BadgeProps> {
  icon?: string | IconifyIcon
  iconSize?: number
  iconColor?: string

  size?: number
  value: number
  color?: string

  scale?: number
}

export interface MessageListItem {
  avatar: Partial<AvatarProps>
  title: string
  content?: string
  time?: string
  tagProps?: Partial<TagProps>
  tag?: string
}

export interface NoticeActionsItem extends IconProps {
  title: string
  // icon: IconProps
  click: () => void
}

export interface NoticeMessageListOptions {
  title: string
  contents?: MessageListItem[]
}

export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionsItem[]
  warpClass?: string
  warpStyle?: CSSProperties
}

export interface NoticeProps extends Partial<NotificationProps>, NoticeMessageListProps {}
