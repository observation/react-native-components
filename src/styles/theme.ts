const font = {
  size: {
    extraSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18,
    huge: 31,
  },
  lineHeight: {
    extraSmall: 16,
    small: 16,
    medium: 20,
    large: 26,
    extraLarge: 28,
    huge: 37,
  },
}

const icon = {
  size: {
    extraSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    extraLarge: 18,
    extraExtraLarge: 24,
    huge: 48,
  },
}

const color = {
  white: '#FFFFFF',
  black: '#212121',
  grey800: '#666666',
  grey500: '#939393',
  grey300: '#E6E6E6',
  grey50: '#F9FAFB',
  primary500: '#0066B1',
  primary300: '#67A4D0',
  primary50: '#E8F1F8',
  success600: '#689023',
  success500: '#85B92D',
  success400: '#9DC556',
  success300: '#B5D482',
  success200: '#CEE2AB',
  success50: '#F7FBEF',
  warning500: '#F4C015',
  error500: '#EA554B',
  error200: '#F7BAB6',
  accentSky400: '#72A1FD',
  accentSky50: '#F0F5FF',
}

const overlay = {
  white70: '#FFFFFFB3',
  grey60: '#66666699',
}

const margin = {
  eighth: 2,
  quarter: 4,
  half: 8,
  common: 16,
  large: 24,
  double: 32,
  huge: 48,
}

const rounded = {
  borderRadius: 4,
  overflow: 'hidden' as const,
}

const input = {
  ...rounded,
  flex: 1,
  minHeight: 40,
  borderWidth: 2,
  paddingLeft: margin.half,
  paddingRight: margin.double,
}

const bottomGradientColors = ['#30303000', '#30303059']
const topGradientColors = bottomGradientColors.slice().reverse()

const getBorderColor = ({ isFocused = false, hasErrors = false }) =>
  hasErrors ? color.error500 : isFocused ? color.primary300 : color.grey300

export default {
  font,
  icon,
  color,
  overlay,
  bottomGradientColors,
  topGradientColors,
  margin,
  input,
  shadow: {
    android: {
      elevation: 6,
      shadowColor: color.grey500,
    },
    ios: {
      shadowOffset: { width: 0, height: 4 },
      shadowColor: color.grey300,
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
  },
  shadowSmall: {
    android: {
      elevation: 4,
      shadowColor: color.grey500,
    },
    ios: {
      shadowOffset: { width: 0, height: 2 },
      shadowColor: color.grey300,
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  },
  rounded,
  roundedLarge: {
    borderRadius: 8,
    overflow: 'hidden' as const,
  },
  roundedHuge: {
    borderRadius: 10,
    overflow: 'hidden' as const,
  },
  absolute: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteLeft: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: 0,
  },
  absoluteRight: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    right: 0,
  },
  absoluteBottom: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteTop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
  },
  getBorderColor,
}
