import React from 'react'
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native'

import { Icon, IconProps } from './Icon'
import theme from '../styles/theme'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?: () => void
  icon: IconProps
  accessibilityLabel?: string
  testID?: string
}

const IconButton = ({ containerStyle, disabled, onPress, icon, accessibilityLabel, testID = 'pressable' }: Props) => (
  <TouchableOpacity
    testID={testID}
    accessibilityLabel={accessibilityLabel}
    style={containerStyle}
    disabled={disabled}
    onPress={disabled ? undefined : onPress}
    activeOpacity={0.5}
  >
    <Icon style={icon.style} name={icon.name} color={icon.color} size={icon.size ?? theme.icon.size.large} />
  </TouchableOpacity>
)

export default IconButton
