import { Platform } from 'react-native'

import { FontMetrics, FontName, FontStyle } from '../@types/font'

export const fontSize = {
  extraSmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  extraLarge: 18,
  huge: 31,
} satisfies FontMetrics

export const lineHeight = {
  extraSmall: 16,
  small: 16,
  medium: 20,
  large: 24,
  extraLarge: 28,
  huge: 37,
} satisfies FontMetrics

export const font = {
  extraSmall: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.extraSmall,
    lineHeight: lineHeight.extraSmall,
    fontWeight: 'normal',
  },
  small: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: 'normal',
  },
  smallBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: 'bold',
  },
  smallLight: {
    fontFamily: Platform.OS === 'android' ? 'Ubuntu-Light' : 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    fontWeight: '100',
  },
  medium: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.medium,
    lineHeight: lineHeight.medium,
    fontWeight: 'normal',
  },
  mediumBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.medium,
    lineHeight: lineHeight.medium,
    fontWeight: 'bold',
  },
  large: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.large,
    lineHeight: lineHeight.large,
    fontWeight: 'normal',
  },
  largeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.large,
    lineHeight: lineHeight.large,
    fontWeight: 'bold',
  },
  extraLarge: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.extraLarge,
    lineHeight: lineHeight.extraLarge,
    fontWeight: 'normal',
  },
  extraLargeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.extraLarge,
    lineHeight: lineHeight.extraLarge,
    fontWeight: 'bold',
  },
  huge: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.huge,
    lineHeight: lineHeight.huge,
    fontWeight: 'normal',
  },
  hugeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: fontSize.huge,
    lineHeight: lineHeight.huge,
    fontWeight: 'bold',
  },
} satisfies Record<FontName, FontStyle>

export default font
