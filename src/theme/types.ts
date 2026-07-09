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

export type ColorMode = 'light'
export type Palette = Record<ColorMode, ColorPrimitives>
export type Scale = Record<number | string, string>

export interface ColorPrimitives {
  base: Scale
  grey: Scale
  primary: Scale
  success: Scale
  warning: Scale
  error: Scale
  accentLime: Scale
  accentSky: Scale
  rarity: Scale
  validation: Scale
  speciesStatus: Scale
}

export interface Color {
  /** @deprecated Use theme.color.background.system.surfaceBase or theme.color.text.system.staticWhite */
  white: string
  /** @deprecated Use theme.color.text.system.strong or theme.color.icon.system.strong */
  black: string
  /** @deprecated Use theme.color.text.system.subtle */
  grey800: string
  /** @deprecated Use theme.color.text.system.subtler or theme.color.icon.system.subtle */
  grey500: string
  /** @deprecated Use theme.color.icon.system.disabled or theme.color.text.system.disabled or theme.color.border.system.default */
  grey300: string
  /** @deprecated Use theme.color.background.system.surfaceRaised or theme.color.border.system.subtle */
  grey50: string
  /** @deprecated Use theme.color.background.system.surfaceLowered */
  grey100: string
  /** @deprecated Use theme.color.icon.system.brand or theme.color.text.system.brand */
  primary500: string
  /** @deprecated Use theme.color.border.system.focus */
  primary300: string
  /** @deprecated Use theme.color.background.system.brand */
  primary50: string
  /** @deprecated Use theme.color.background.system.success or theme.color.text.system.success */
  success500: string
  /** @deprecated Use theme.color.background.system.success */
  success400: string
  /** @deprecated Use theme.color.background.system.success */
  success200: string
  /** @deprecated Use theme.color.background.system.success */
  success50: string
  /** @deprecated Use theme.color.text.gps.accuracySuccess */
  success600: string
  /** @deprecated Use theme.color.text.system.success */
  success700: string
  /** @deprecated Use theme.color.background.system.warning or theme.color.text.system.warning */
  warning500: string
  /** @deprecated Use theme.color.background.system.warning */
  warning200: string
  /** @deprecated Use theme.color.text.system.warning */
  warning700: string
  /** @deprecated Use theme.color.background.system.error or theme.color.text.system.error */
  error500: string
  /** @deprecated Use theme.color.background.system.error */
  error200: string
  /** @deprecated Use theme.color.text.system.error */
  error700: string
  /** @deprecated Use theme.color.background.system.observationStrong or theme.color.icon.system.observationStrong */
  accentLime400: string
  /** @deprecated Use theme.color.background.system.observationSubtle */
  accentLime50: string
  /** @deprecated Use theme.color.background.system.speciesStrong or theme.color.icon.system.speciesStrong */
  accentSky400: string
  /** @deprecated Use theme.color.background.system.speciesSubtle */
  accentSky50: string

  text: {
    system: {
      strong: string
      subtle: string
      subtler: string
      inverse: string
      staticWhite: string
      brand: string
      link: string
      disabled: string
      success: string
      warning: string
      error: string
      observationStrong: string
      speciesStrong: string
    }
    gps: {
      accuracySuccess: string
      accuracyWarning: string
      accuracyError: string
    }
  }
  background: {
    system: {
      surfaceBase: string
      surfaceRaised: string
      surfaceLowered: string
      disabled: string
      surfacePopped: string
      brand: string
      success: string
      warning: string
      error: string
      coverImage: string
      observationSubtle: string
      observationStrong: string
      speciesSubtle: string
      speciesStrong: string
    }
    gps: {
      accuracySuccess: string
      accuracyWarning: string
      accuracyError: string
    }
  }
  icon: {
    system: {
      brand: string
      link: string
      disabled: string
      success: string
      warning: string
      error: string
      observationStrong: string
      speciesStrong: string
      staticWhite: string
      subtle: string
      strong: string
    }
    rarity: {
      unknown: string
      common: string
      relativelyCommon: string
      rare: string
      veryRare: string
    }
    speciesStatus: {
      unknown: string
      insufficientData: string
      native: string
      exoticEtc: string
    }
    validation: {
      unknown: string
      accepted: string
      plausible: string
      automatic: string
      pending: string
      rejected: string
      cannotBeValidated: string
    }
  }
  border: {
    system: {
      brand: string
      disabled: string
      success: string
      warning: string
      error: string
      subtler: string
      inverse: string
      speciesStrong: string
      observationStrong: string
      default: string
      subtle: string
      focus: string
    }
    status: {
      uploadable: string
      error: string
    }
  }
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
