import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import nl from './locales/nl.json'
import I18n from '../lib/I18n'

const translations = { en, nl, de, fr, es }

const i18n = new I18n(translations, { setLanguage: () => {} })

export default i18n
