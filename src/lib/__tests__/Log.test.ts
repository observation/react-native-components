import Log, { setLogConfiguration } from '../Log'

describe('Log', () => {
  describe('Set different transportFunction', () => {
    test('Trace', () => {
      // GIVEN
      const transportFunction = jest.fn()
      setLogConfiguration({ transport: transportFunction, severity: 'trace' })

      // WHEN
      Log.trace('Some text')

      // THEN
      expect(transportFunction).toBeCalledWith(expect.objectContaining({ rawMsg: ['Some text'] }))
    })

    test('Debug', () => {
      // GIVEN
      const transportFunction = jest.fn()
      setLogConfiguration({ transport: transportFunction })

      // WHEN
      Log.debug('Some text')

      // THEN
      expect(transportFunction).toBeCalledWith(expect.objectContaining({ rawMsg: ['Some text'] }))
    })

    test('Info', () => {
      // GIVEN
      const transportFunction = jest.fn()
      setLogConfiguration({ transport: transportFunction })

      // WHEN
      Log.info('Some text')

      // THEN
      expect(transportFunction).toBeCalledWith(expect.objectContaining({ rawMsg: ['Some text'] }))
    })

    test('Warn', () => {
      // GIVEN
      const transportFunction = jest.fn()
      setLogConfiguration({ transport: transportFunction })

      // WHEN
      Log.warn('Some text')

      // THEN
      expect(transportFunction).toBeCalledWith(expect.objectContaining({ rawMsg: ['Some text'] }))
    })

    test('Error', () => {
      // GIVEN
      const transportFunction = jest.fn()
      setLogConfiguration({ transport: transportFunction })

      // WHEN
      Log.error('Some text')

      // THEN
      expect(transportFunction).toBeCalledWith(expect.objectContaining({ rawMsg: ['Some text'] }))
    })
  })
})
