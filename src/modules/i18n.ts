import { createI18n, type Locale } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
})

const elementPlusLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs')).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.mjs$/)?.[1], loadLocale]
  )
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const filterEplocales = availableLocales.reduce(
  (acc: Record<Locale, () => Promise<{ default: Record<string, string> }>>, cur) => {
    return {
      ...acc,
      [cur]: elementPlusLocalesMap[cur.toLocaleLowerCase()]
    }
  },
  {}
)
console.log('🚀 ~ filterEplocales:', filterEplocales)

const loadedLanguages: string[] = []
export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale
  if (typeof document !== 'undefined') {
    document?.querySelector('html')?.setAttribute('lang', locale)
  }
}

export async function loadLocaleMessages(locale: string) {
  // 如果已被i18n加载缓存的，
  if (i18n.global.locale.value === locale || loadedLanguages.includes(locale)) {
    return setI18nLanguage(locale)
  }
  const messages = await localesMap[locale]()
  const elementPlusMessages = await filterEplocales[locale]()
  i18n.global.setLocaleMessage(locale, { ...elementPlusMessages.default, ...messages.default })

  loadedLanguages.push(locale)
  return setI18nLanguage(locale)
}

export default {
  install: (app: any) => {
    app.use(i18n)
    loadLocaleMessages('en')
  }
}
