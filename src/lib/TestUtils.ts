import Rarity from '../data/Rarity'

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

const rarities = [
  new Rarity(0, 'unknown'),
  new Rarity(1, 'common'),
  new Rarity(2, 'relatively common'),
  new Rarity(3, 'rare'),
  new Rarity(4, 'very rare'),
]

export { mockNavigation, mockNavigationContext, rarities }
