export interface ThemeAnimation {
  duration: {
    medium: number
  }
}

export interface ThemeColor {
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

export interface ThemeOverlay {
  white00: string
  white05: string
  white10: string
  white70: string
  white80: string
  black50: string
  grey60: string
}

export interface ThemeGradient {
  bottom: string[]
  top: string[]
}

export interface ThemeIcon {
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

export interface ThemeMargin {
  eighth: number
  quarter: number
  half: number
  common: number
  large: number
  double: number
  huge: number
}

export interface Theme {
  animation: ThemeAnimation
  icon: ThemeIcon
  color: ThemeColor
  overlay: ThemeOverlay
  gradient: ThemeGradient
  margin: ThemeMargin
}
