import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { theme } from '../styles'

type LargeButtonStyle = {
  buttonStyle: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  iconColor: string
}

const primary: LargeButtonStyle = {
  buttonStyle: {
    backgroundColor: theme.color.primary500,
  },
  textStyle: { color: theme.color.white },
  iconColor: theme.color.white,
}

const primaryDisabled: LargeButtonStyle = {
  buttonStyle: {
    backgroundColor: theme.color.grey300,
  },
  textStyle: { color: theme.color.white },
  iconColor: theme.color.white,
}

const primaryDanger: LargeButtonStyle = {
  buttonStyle: {
    backgroundColor: theme.color.error500,
  },
  textStyle: { color: theme.color.white },
  iconColor: theme.color.white,
}

const secondary: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.primary500,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.primary500 },
  iconColor: theme.color.primary500,
}

const secondaryDisabled: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.grey300,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.grey300 },
  iconColor: theme.color.grey300,
}

const secondaryDanger: LargeButtonStyle = {
  buttonStyle: {
    borderColor: theme.color.error500,
    borderWidth: 2,
    backgroundColor: theme.color.white,
  },
  textStyle: { color: theme.color.error500 },
  iconColor: theme.color.error500,
}

export type { LargeButtonStyle }

export { primary, primaryDisabled, primaryDanger, secondary, secondaryDisabled, secondaryDanger }
