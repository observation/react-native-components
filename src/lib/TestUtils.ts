import I18n, { Api } from './I18n'

const mockNavigation: any = {
  navigate: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
  replace: jest.fn(),
  goBack: jest.fn(),
  popToTop: jest.fn(),
  canGoBack: jest.fn(),
  setOptions: jest.fn(),
  getState: jest.fn(() => ({ index: 0 })),
}

const mockNavigationContext: any = {
  isFocused: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  navigate: jest.fn(),
}

function getTestI18n(api: Api = { setLanguage: () => {} }): I18n {
  const everyKeyReturnsItsOwnPropertyName = {
    get: (_: any, prop: string) => prop,
  }
  const genericDictionary = new Proxy({}, everyKeyReturnsItsOwnPropertyName)
  return new I18n(
    {
      en: genericDictionary,
      nl: genericDictionary,
      de: genericDictionary,
      fr: genericDictionary,
      es: genericDictionary,
    },
    api,
  )
}

export { mockNavigation, mockNavigationContext, getTestI18n }
