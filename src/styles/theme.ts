import { Theme, ThemeAnimation, ThemeColor, ThemeGradient, ThemeIcon, ThemeMargin, ThemeOverlay } from '../@types/theme'

const icon = {
  size: {
    xxs: 8,
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    xxl: 24,
    xxxl: 48,
  },
} satisfies ThemeIcon

const color = {
  white: '#FFFFFF',
  black: '#212121',
  grey800: '#666666',
  grey500: '#939393',
  grey300: '#E6E6E6',
  grey100: '#F0F0F0',
  grey50: '#F9FAFB',
  primary500: '#0066B1',
  primary300: '#67A4D0',
  primary50: '#E8F1F8',
  success700: '#50701A',
  success600: '#689023',
  success500: '#85B92D',
  success400: '#9BC454',
  success200: '#CEE2AB',
  success50: '#F7FBEF',
  warning700: '#93730B',
  warning500: '#F4C015',
  warning200: '#FBE6A2',
  error700: '#8B332D',
  error500: '#EA554B',
  error200: '#F7BAB6',
  accentLime50: '#F7FBEF',
  accentLime400: '#9BC454',
  accentSky50: '#F0F5FF',
  accentSky400: '#72A1FD',
} satisfies ThemeColor

const overlay = {
  white00: '#ffffff00',
  white05: '#FFFFFF0D',
  white10: '#FFFFFF1A',
  white70: '#FFFFFFB3',
  white80: '#FFFFFFCC',
  black50: '#00000080',
  grey60: '#66666699',
} satisfies ThemeOverlay

const gradient = {
  bottom: ['#30303000', '#30303059'],
  top: ['#30303059', '#30303000'],
} satisfies ThemeGradient

const margin = {
  eighth: 2,
  quarter: 4,
  half: 8,
  common: 16,
  large: 24,
  double: 32,
  huge: 48,
} satisfies ThemeMargin

const animation = {
  duration: {
    medium: 300,
  },
} satisfies ThemeAnimation

export const defaultTheme = {
  icon,
  color,
  overlay,
  gradient,
  animation,
  margin,
} satisfies Theme

// To make existing imports work without having to change the import path
export default defaultTheme
