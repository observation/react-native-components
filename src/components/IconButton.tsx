import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

import { Icon, IconProps } from './Icon'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?: () => void
  icon: IconProps
  accessibilityLabel?: string
  testID?: string
}

const IconButton = ({ containerStyle, disabled, onPress, icon, accessibilityLabel, testID = 'pressable' }: Props) => {
  const theme = useTheme()
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={containerStyle}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.5}
    >
      <Icon size={theme.icon.size.l} {...icon} />
    </TouchableOpacity>
  )
}

export default IconButton
