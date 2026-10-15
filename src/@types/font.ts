import { TextStyle } from 'react-native'

import { MixedSizeCSSPropertiesKeys } from '@native-html/render'

/**
 * React Native's TextStyle, narrowed to be compatible with @native-html/render's MixedStyleDeclaration.
 *
 * MixedStyleDeclaration is missing the overflow: 'scroll' property, and only accepts number | string
 * for size properties (React Native's DimensionValue also allows null). In order to use the React
 * Native's TextStyle together with the HtmlContent (RenderHtml) component (and type checking) we
 * override the overflow property and the size properties with our own types.
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
