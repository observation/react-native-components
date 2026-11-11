import { TextStyle } from 'react-native'

import { ShadowStyle } from '../@types/shadow'

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
  shadow: Shadow
  surface: Surface
  elevation: Elevation
}

export interface Animation {
  duration: {
    medium: number
  }
}

export type Scale = Record<number | string, string>

export interface Palette {
  base: Scale
  grey: Scale
  primary: Scale
  green: Scale
  yellow: Scale
  red: Scale
  accentLime: Scale
  accentSky: Scale
  accentCyan: Scale
}

export interface Color {
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
      successDark: string
      warning: string
      warningDark: string
      error: string
      errorDark: string
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
      /** Background of a screen, the color of the surface selected by theme.surface.screen */
      screen: string

      surfaceBase: string
      surfaceRaised: string
      surfaceLowered: string
      disabled: string
      surfacePopped: string
      brand: string
      success: string
      successSubtle: string
      warning: string
      warningSubtle: string
      error: string
      errorSubtle: string
      coverImage: string
      observationSubtle: string
      observationStrong: string
      speciesSubtle: string
      speciesStrong: string
      active: string
      accented: string
      staticBlack: string
      audioPlayer: string
      readOnly: string
      chipSelected: string
      placeholder: string
    }
    gps: {
      accuracySuccess: string
      accuracyWarning: string
      accuracyError: string
    }
  }
  icon: {
    system: {
      strong: string
      subtle: string
      subtler: string
      staticWhite: string
      brand: string
      link: string
      disabled: string
      success: string
      warning: string
      error: string
      observationStrong: string
      speciesStrong: string
      audioPlayer: string
    }
    rarity: {
      unknown: string
      common: string
      relativelyCommon: string
      rare: string
      veryRare: string
    }
    speciesStatus: {
      native: string
      incidentalMigrant: string
      insufficientData: string
      other: string
      unknown: string
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
      strong: string
      subtle: string
      subtler: string
      subtlest: string
      brand: string
      disabled: string
      success: string
      warning: string
      error: string
      inverse: string
      staticWhite: string
      speciesStrong: string
      observationStrong: string
      base: string
      focus: string
      transect: string
      transectBorder: string
      selected: string
    }
    syncStatus: {
      local: string
    }
    status: {
      uploadable: string
      error: string
    }
  }
  shadow: {
    system: {
      /** Shadow color on iOS */
      base: string
      /** Shadow color of an elevation on Android */
      elevation: string
      /** Darker shadow color of an elevation on Android, for large floating surfaces */
      elevationStrong: string
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
  grey40: string
  grey60: string
}

export interface Gradient {
  bottom: string[]
  bottomLight: string[]
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

export interface Shadow {
  none: ShadowStyle
  small: ShadowStyle
  normal: ShadowStyle
  large: ShadowStyle
  dragged: ShadowStyle
}

export type ShadowName = keyof Shadow

export type SurfaceName = Extract<keyof Color['background']['system'], `surface${string}`>

/** Surfaces the app uses for specific roles, referenced by name so they follow the color of the active mode */
export interface Surface {
  /** Background of a screen, also used by bars docked to a screen edge */
  screen: SurfaceName
}

/** Shadows the app uses for elevated elements, referenced by name so they follow the shadow of the active mode */
export interface Elevation {
  /** Elements docked to a screen edge, raised above the screen content */
  raised: ShadowName
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

export type ScaleName = 'extraExtraSmall' | 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge' | 'huge'

export type FontSize = Record<ScaleName, number>
export type LineHeight = Record<ScaleName, number>

export type FontName =
  | 'extraExtraSmall'
  | 'extraExtraSmallBold'
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
  | 'bodyBlack'
  | 'light'
  | 'lead'
  | 'link'
  | 'linkBold'
  | 'input'
  | 'subtitle'
  | 'title'
  | 'percentage'
  | 'thumbnail'
  | 'subLabel'
  | 'speciesLocalName'
  | 'speciesLocalNameCompact'
  | 'speciesScientificName'
  | 'inputPanelHeader'
  | keyof TextNameOverrides

export interface Text {
  iconLabel: TextStyle
  tabIconLabel: TextStyle
  inputLabel: TextStyle
  /** @deprecated Use theme.text.speciesScientificName */
  scientificName: TextStyle
  body: TextStyle
  bodyBlack: TextStyle
  bodyCompact: TextStyle
  light: TextStyle
  lead: TextStyle
  link: TextStyle
  linkBold: TextStyle
  input: TextStyle
  subtitle: TextStyle
  title: TextStyle
  percentage: TextStyle
  thumbnail: TextStyle
  subLabel: TextStyle
  speciesLocalName: TextStyle
  speciesLocalNameCompact: TextStyle
  speciesScientificName: TextStyle
  inputPanelHeader: TextStyle
  [name: string]: TextStyle
}
