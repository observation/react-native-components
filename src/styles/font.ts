import { Platform, TextStyle } from 'react-native'

import theme from './theme'

/**
 * Reacht Native's TextStyle without the overflow:'scroll' property.
 *
 * The component @native-html (used by react-native-render-html) is missing the overflow: 'scroll' property.
 * In order to use the React Native's TextStyle together with the RenderHtml component (and type checking)
 * we override the overflow property with our own overflow type
 */
type FontStyle = TextStyle & { overflow?: 'visible' | 'hidden' | undefined }

type FontName =
  | 'extraSmall'
  | 'small'
  | 'smallBold'
  | 'smallLight'
  | 'medium'
  | 'mediumBold'
  | 'large'
  | 'largeBold'
  | 'extraLarge'
  | 'extraLargeBold'
  | 'huge'
  | 'hugeBold'

const font: Record<FontName, FontStyle> = {
  extraSmall: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.extraSmall,
    lineHeight: theme.font.lineHeight.extraSmall,
    fontWeight: 'normal',
  },
  small: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.small,
    lineHeight: theme.font.lineHeight.small,
    fontWeight: 'normal',
  },
  smallBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.small,
    lineHeight: theme.font.lineHeight.small,
    fontWeight: 'bold',
  },
  smallLight: {
    fontFamily: Platform.OS === 'android' ? 'Ubuntu-Light' : 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.small,
    lineHeight: theme.font.lineHeight.small,
    fontWeight: '100',
  },
  medium: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.medium,
    lineHeight: theme.font.lineHeight.medium,
    fontWeight: 'normal',
  },
  mediumBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.medium,
    lineHeight: theme.font.lineHeight.medium,
    fontWeight: 'bold',
  },
  large: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.large,
    lineHeight: theme.font.lineHeight.large,
    fontWeight: 'normal',
  },
  largeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.large,
    lineHeight: theme.font.lineHeight.large,
    fontWeight: 'bold',
  },
  extraLarge: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.extraLarge,
    lineHeight: theme.font.lineHeight.extraLarge,
    fontWeight: 'normal',
  },
  extraLargeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.extraLarge,
    lineHeight: theme.font.lineHeight.extraLarge,
    fontWeight: 'bold',
  },
  huge: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.huge,
    lineHeight: theme.font.lineHeight.huge,
    fontWeight: 'normal',
  },
  hugeBold: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontSize: theme.font.size.huge,
    lineHeight: theme.font.lineHeight.huge,
    fontWeight: 'bold',
  },
}

export default font
export type { FontStyle, FontName }
