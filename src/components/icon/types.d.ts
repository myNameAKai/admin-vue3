export type NeticonProps = {
  url: string
  fontFamily?: string
  fontClass?: string
  type: string
}

export type IconPickerSubmitProps = {
  icon: string
  fontSize: number
  color: string
}

export interface IconListProps {
  iconData: string[]
  collection: string
  itemClass: string
  iconClass: string
  showText: boolean
  activeClass: string
}
