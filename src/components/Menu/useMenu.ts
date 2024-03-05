import type { AppRouteMenuItem } from './type'

export function useMenu() {
  function generateMenuKeys(menus: AppRouteMenuItem[], level = '1') {
    const filteredMenus = menus
      .filter((m) => !m.meta?.hideMenu)
      ?.sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))

    let i = 1
    filteredMenus.forEach((item) => {
      const key = level.indexOf('-') !== -1 ? `${level}${i}` : `${i}`
      item.meta = {
        ...item.meta,
        key
      }
      i++
      if (item.children && item.children.length > 0) {
        return (item.children = generateMenuKeys(item.children, `${key}-`))
      }
    })
    return filteredMenus
  }

  function getIndex(item: AppRouteMenuItem): string {
    return `${item.meta?.key}`
  }

  function menuHasChildren(item: AppRouteMenuItem): boolean {
    return !item.meta?.hideMenu && Array.isArray(item.children) && item.children.length > 0
  }

  return { generateMenuKeys, getIndex, menuHasChildren }
}
