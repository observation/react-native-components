import { I18nManager } from 'react-native'

import Countries from 'i18n-iso-countries'
import { I18n as I18nJs } from 'i18n-js'
import 'moment/min/locales'
import { Scope, TranslateOptions } from 'i18n-js/typings/typing'
import moment from 'moment'
import * as RNLocalize from 'react-native-localize'

import Log from './Log'

Countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
Countries.registerLocale(require('i18n-iso-countries/langs/nl.json'))
Countries.registerLocale(require('i18n-iso-countries/langs/de.json'))
Countries.registerLocale(require('i18n-iso-countries/langs/es.json'))
Countries.registerLocale(require('i18n-iso-countries/langs/fr.json'))

interface SupportedLanguages {
  en: Object
  nl: Object
  de: Object
  fr: Object
  es: Object
}

interface Api {
  setLanguage(language: string): void
}

/** Wrapper class around i18n-js, adding a few more methods */
class I18n {
  i18nJs = new I18nJs()

  constructor(private translations: SupportedLanguages, private api: Api) {
    this.i18nJs.translations = translations
    this.i18nJs.enableFallback = false
    this.configure()
  }

  setLocale = (locale: string) => {
    Log.debug('i18n:setLocale', locale)
    this.i18nJs.locale = locale
    moment.locale(locale)
    this.api.setLanguage(locale)
  }

  get locale() {
    return this.i18nJs.locale
  }

  /** Handle setting an initial or changed locale */
  configure = () => {
    const fallback = { languageTag: 'en', isRTL: false }
    const languages = Object.keys(this.translations)
    const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(languages) || fallback
    Log.debug('i18n:configure', languageTag)
    I18nManager.forceRTL(isRTL) // optional, you might not want to handle RTL
    this.setLocale(languageTag)
  }

  getCountryFromLocale = () => {
    Log.debug('i18n:getCountryFromLocale')

    const fallback = 'NL'
    const locales = RNLocalize.getLocales()
    return locales.length > 0 ? locales[0].countryCode : fallback
  }

  getLanguageFromLocale = () => {
    Log.debug('i18n:getLanguageFromLocale')

    const locales = RNLocalize.getLocales()
    return locales.length > 0 ? locales[0].languageCode : null
  }

  country = (code: string) => Countries.getName(code, this.locale, { select: 'official' })

  t = (key: Scope, options?: TranslateOptions | undefined) => this.i18nJs.t(key, options)
}

export default I18n
export type { Api }
