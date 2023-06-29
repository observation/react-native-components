import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import theme from '../styles/theme'

type LargeButtonStyle = {
  buttonStyle: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  iconColor: string
}

const primary: LargeButtonStyle = {
  buttonStyle: {
    backgroundColor: theme.color.primary,
  },
  textStyle: { color: theme.color.white },
  iconColor: theme.color.white,
}

const primaryDisabled: LargeButtonStyle = {
  buttonStyle: {
    backgroundColor: theme.color.greySemi,
  },
  textStyle: { color: theme.color.white },
  iconColor: theme.color.white,
}

const secondary: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.primary,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.primary },
  iconColor: theme.color.primary,
}

const secondaryDisabled: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.greySemi,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.greySemi },
  iconColor: theme.color.greySemi,
}

const secondaryDanger: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.error,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.error },
  iconColor: theme.color.error,
}

export type { LargeButtonStyle }

export { primary, primaryDisabled, secondary, secondaryDisabled, secondaryDanger }
