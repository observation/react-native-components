const crash = jest.fn()  
const setUserId = jest.fn(() => Promise.resolve())

export default { 
  __esModule: true,
  default: () => ({
  crash,
  setUserId
  }),
}

