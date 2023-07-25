import Color from 'color'

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
    small: 17,
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

const black = '#212121'
const greyBase = '#939393'

const color = {
  primary: '#0066B1',
  primaryLighter: '#66A3D0',
  primaryLightest: '#E6F0F7',
  secondaryLight: '#709FFD',
  secondaryLightestExtra: '#F0F5FF',
  black,
  greyDark: '#666666',
  greyBase,
  placeholder: greyBase,
  greySemi: '#E6E6E6',
  greyLight: '#F8F9FA',
  white: '#FFFFFF',
  white70: '#FFFFFFB4',
  white77: '#FFFFFFC4',
  white80: '#FFFFFFCD',
  success: '#84B72C',
  successLight: '#9DC556',
  successLighter: '#B5D480',
  successLightest: '#CEE2AB',
  successLightestExtra: '#F7FBEF',
  successDark: '#6A9223',
  warning: '#F4C013',
  error: '#EA554B',
  errorLightest: '#F7BBB7',
  modalBackground: Color(black).alpha(0.6).lighten(0.4).string(),
  darkPanelBackground: Color(black).alpha(0.5).string(),
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
  overflow: 'hidden' as 'hidden',
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
  hasErrors ? color.error : isFocused ? color.primaryLighter : color.greySemi

export default {
  font,
  icon,
  color,
  bottomGradientColors,
  topGradientColors,
  margin,
  input,
  shadow: {
    android: {
      elevation: 6,
      shadowColor: color.greyBase,
    },
    ios: {
      shadowOffset: { width: 0, height: 4 },
      shadowColor: color.greySemi,
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
  },
  shadowSmall: {
    android: {
      elevation: 4,
      shadowColor: color.greyBase,
    },
    ios: {
      shadowOffset: { width: 0, height: 2 },
      shadowColor: color.greySemi,
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  },
  rounded,
  roundedLarge: {
    borderRadius: 8,
    overflow: 'hidden' as 'hidden',
  },
  roundedHuge: {
    borderRadius: 10,
    overflow: 'hidden' as 'hidden',
  },
  absolute: {
    position: 'absolute' as 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteLeft: {
    position: 'absolute' as 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  absoluteRight: {
    position: 'absolute' as 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
  absoluteBottom: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  absoluteTop: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  getBorderColor,
}
