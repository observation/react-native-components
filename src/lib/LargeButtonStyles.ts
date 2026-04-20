import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { Theme } from '../theme/types'

type LargeButtonStyle = {
  buttonStyle: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  iconColor: string
}

const primary = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    backgroundColor: theme.color.background.system.brand,
  },
  textStyle: { color: theme.color.text.system.staticWhite },
  iconColor: theme.color.icon.system.staticWhite,
})

const primaryDisabled = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    backgroundColor: theme.color.background.system.disabled,
  },
  textStyle: { color: theme.color.text.system.staticWhite },
  iconColor: theme.color.icon.system.staticWhite,
})

const primaryDanger = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    backgroundColor: theme.color.background.system.error,
  },
  textStyle: { color: theme.color.text.system.staticWhite },
  iconColor: theme.color.icon.system.staticWhite,
})

const secondary = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    borderColor: theme.color.border.system.brand,
    borderWidth: 2,
    backgroundColor: theme.color.background.system.surfaceBase,
  },
  textStyle: { color: theme.color.text.system.brand },
  iconColor: theme.color.icon.system.brand,
})

const secondaryDisabled = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    borderColor: theme.color.border.system.disabled,
    borderWidth: 2,
    backgroundColor: theme.color.background.system.surfaceBase,
  },
  textStyle: { color: theme.color.text.system.disabled },
  iconColor: theme.color.icon.system.disabled,
})

const secondaryDanger = (theme: Theme): LargeButtonStyle => ({
  buttonStyle: {
    borderColor: theme.color.border.system.error,
    borderWidth: 2,
    backgroundColor: theme.color.background.system.surfaceBase,
  },
  textStyle: { color: theme.color.text.system.error },
  iconColor: theme.color.icon.system.error,
})

export type { LargeButtonStyle }

export { primary, primaryDisabled, primaryDanger, secondary, secondaryDisabled, secondaryDanger }
