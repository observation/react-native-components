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

export { mockNavigation }
