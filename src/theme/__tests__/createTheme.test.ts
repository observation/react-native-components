import { createTheme } from '../createTheme'
import { fontSize } from '../tokens/fontSize'
import { icon } from '../tokens/icon'
import { lineHeight } from '../tokens/lineHeight'

describe('createTheme', () => {
  describe('Font size and line height', () => {
    test('Defaults', () => {
      // GIVEN
      const theme = createTheme()

      // THEN
      expect(theme.fontSize).toEqual(fontSize)
      expect(theme.lineHeight).toEqual(lineHeight)
      expect(theme.font.medium.fontSize).toBe(fontSize.medium)
      expect(theme.text.body.lineHeight).toBe(lineHeight.medium)
    })

    test('Overrides', () => {
      // GIVEN
      const theme = createTheme({ fontSize: { ...fontSize, medium: 99 }, lineHeight: { ...lineHeight, medium: 101 } })

      // THEN
      expect(theme.fontSize).toEqual({ ...fontSize, medium: 99 })
      expect(theme.lineHeight).toEqual({ ...lineHeight, medium: 101 })
      expect(theme.font.medium).toEqual(expect.objectContaining({ fontSize: 99, lineHeight: 101 }))
      expect(theme.text.body).toEqual(expect.objectContaining({ fontSize: 99, lineHeight: 101 }))
    })
  })

  describe('Other overrides', () => {
    test('Overridden values replace the defaults, other values are kept', () => {
      // GIVEN
      const theme = createTheme({ icon: { size: { ...icon.size, l: 99 } } })

      // THEN
      expect(theme.icon.size).toEqual({ ...icon.size, l: 99 })
      expect(theme.margin).toEqual(createTheme().margin)
    })

    test('Overrides do not change the default tokens', () => {
      // GIVEN
      createTheme({ icon: { size: { ...icon.size, l: 99 } } })

      // WHEN
      const theme = createTheme()

      // THEN
      expect(theme.icon.size.l).toBe(icon.size.l)
    })
  })

  describe('Shadow', () => {
    test.each(['normal', 'small'] as const)('%s uses the shadow colors', (name) => {
      // GIVEN
      const theme = createTheme()

      // THEN
      expect(theme.shadow[name].ios.shadowColor).toBe(theme.color.shadow.system.base)
      expect(theme.shadow[name].android.shadowColor).toBe(theme.color.shadow.system.elevation)
    })

    test('none has no shadow', () => {
      // GIVEN
      const theme = createTheme()

      // THEN
      expect(theme.shadow.none).toEqual({ android: {}, ios: {} })
    })
  })

  describe('Surface and elevation', () => {
    test('Defaults', () => {
      // GIVEN
      const theme = createTheme()

      // THEN
      expect(theme.surface.screen).toBe('surfaceBase')
      expect(theme.elevation.raised).toBe('normal')
      expect(theme.shadow[theme.elevation.raised].ios.shadowColor).toBe(theme.color.shadow.system.base)
      expect(theme.shadow[theme.elevation.raised].android.shadowColor).toBe(theme.color.shadow.system.elevation)
    })

    test('Overrides', () => {
      // GIVEN
      const theme = createTheme({ surface: { screen: 'surfaceRaised' }, elevation: { raised: 'none' } })

      // THEN
      expect(theme.surface.screen).toBe('surfaceRaised')
      expect(theme.shadow[theme.elevation.raised]).toEqual({ android: {}, ios: {} })
    })

    test('Overrides do not change the default theme', () => {
      // GIVEN
      createTheme({ surface: { screen: 'surfaceRaised' }, elevation: { raised: 'none' } })

      // WHEN
      const theme = createTheme()

      // THEN
      expect(theme.surface.screen).toBe('surfaceBase')
      expect(theme.elevation.raised).toBe('normal')
    })
  })

  describe('Screen color', () => {
    test('Default', () => {
      // GIVEN
      const theme = createTheme()

      // THEN
      expect(theme.color.background.system.screen).toBe(theme.color.background.system.surfaceBase)
    })

    test('Follows the overridden screen surface', () => {
      // GIVEN
      const theme = createTheme({ surface: { screen: 'surfaceRaised' } })

      // THEN
      expect(theme.color.background.system.screen).toBe(theme.color.background.system.surfaceRaised)
    })

    test('Follows an overridden color of the screen surface', () => {
      // GIVEN
      const { color } = createTheme()
      const background = { ...color.background, system: { ...color.background.system, surfaceRaised: '#123456' } }
      const theme = createTheme({ color: { background }, surface: { screen: 'surfaceRaised' } })

      // THEN
      expect(theme.color.background.system.screen).toBe('#123456')
    })
  })

  describe('Derived sections', () => {
    test('Text styles and shadows follow overridden colors', () => {
      // GIVEN
      const { color } = createTheme()
      const text = { ...color.text, system: { ...color.text.system, strong: '#123456' } }
      const shadow = { system: { ...color.shadow.system, base: '#654321' } }
      const theme = createTheme({ color: { text, shadow } })

      // THEN
      expect(theme.text.lead.color).toBe('#123456')
      expect(theme.shadow.normal.ios.shadowColor).toBe('#654321')
    })

    test('An override of a derived section replaces the derived values', () => {
      // GIVEN
      const { text } = createTheme()
      const theme = createTheme({ text: { ...text, lead: { ...text.lead, color: '#123456' } } })

      // THEN
      expect(theme.text.lead.color).toBe('#123456')
      expect(theme.text.body).toEqual(text.body)
    })
  })
})
