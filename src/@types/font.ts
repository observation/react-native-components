import { TextStyle } from 'react-native'

import { MixedSizeCSSPropertiesKeys } from 'react-native-render-html'

/**
 * React Native's TextStyle without the overflow:'scroll' property.
 *
 * The component @native-html (used by react-native-render-html) is missing the overflow: 'scroll' property.
 * In order to use the React Native's TextStyle together with the HtmlContent (RenderHtml) component
 * (and type checking) we override the overflow property with our own overflow type.
 */
export type FontStyle = TextStyle & { overflow?: 'visible' | 'hidden' | undefined } & {
  [k in MixedSizeCSSPropertiesKeys]?: number | string
} & Required<Pick<TextStyle, 'fontSize' | 'lineHeight'>>

export type FontName =
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

export type FontMetrics = {
  extraSmall: number
  small: number
  medium: number
  large: number
  extraLarge: number
  huge: number
}
