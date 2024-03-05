import type { IconifyIcon } from '@iconify/vue'
import type { CSSProperties } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | Promise<typeof import('*.vue')>
  | (() => Promise<T> | T)
export interface RouteMeta extends Record<string | number | symbol, unknown> {
  title?: string
  layout?: string
  // 菜单排序
  order?: number
  icon?: string | IconifyIcon
  hideMenu?: boolean
  disabled?: boolean
}
export interface AppRouteMenuItem {
  name?: string | symbol
  meta?: RouteMeta
  children?: AppRouteMenuItem[]
  alias?: string
  path: string
  component?: Component
}

export interface IconOptions {
  style: CSSProperties
  class: string
}
