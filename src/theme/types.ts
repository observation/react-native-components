import { TextStyle } from 'react-native'

export interface Theme {
  animation: Animation
  icon: Icon
  color: Color
  overlay: Overlay
  gradient: Gradient
  margin: Margin
  fontSize: FontSize
  lineHeight: LineHeight
  font: Font
  text: Text
}

export interface Animation {
  duration: {
    medium: number
  }
}

export interface Color {
  white: string
  black: string
  grey800: string
  grey500: string
  grey300: string
  grey50: string
  grey100: string
  primary500: string
  primary300: string
  primary50: string
  success500: string
  success200: string
  success700: string
  success600: string
  success400: string
  success50: string
  warning500: string
  warning700: string
  warning200: string
  error500: string
  error200: string
  error700: string
  accentLime400: string
  accentLime50: string
  accentSky400: string
  accentSky50: string
}

export interface Overlay {
  white00: string
  white05: string
  white10: string
  white70: string
  white80: string
  black50: string
  grey60: string
}

export interface Gradient {
  bottom: string[]
  top: string[]
}

export interface Icon {
  size: {
    xxs: number
    xs: number
    s: number
    m: number
    l: number
    xl: number
    xxl: number
    xxxl: number
  }
}

export interface Margin {
  eighth: number
  quarter: number
  half: number
  common: number
  large: number
  double: number
  huge: number
}

export type ScaleName = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge' | 'huge'

export type FontSize = Record<ScaleName, number>
export type LineHeight = Record<ScaleName, number>

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
export type FontFamily = 'Ubuntu' | 'Ubuntu-Light'
export type FontStyle = 'normal'
export type FontWeight = 'normal' | 'bold' | '100'

export type FontToken = {
  fontFamily: FontFamily
  fontStyle: FontStyle
  fontSize: number
  lineHeight: number
  fontWeight: FontWeight
}

export type Font = Record<FontName, FontToken>

export interface TextNameOverrides {
  [key: string]: true | undefined
}

export type TextName =
  | 'iconLabel'
  | 'tabIconLabel'
  | 'inputLabel'
  | 'scientificName'
  | 'body'
  | 'light'
  | 'lead'
  | 'link'
  | 'linkBold'
  | 'input'
  | 'subtitle'
  | 'title'
  | 'percentage'
  | 'thumbnail'
  | keyof TextNameOverrides

export type Text = Record<TextName, TextStyle>
