import React from 'react'
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native'

import { Icon } from './Icon'
import { IconName } from '../lib/Icons'
import theme from '../styles/theme'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?: () => void
  iconName: IconName
  iconStyle?: 'light' | 'solid'
  size?: number
  color?: string
  accessibilityLabel?: string
  testID?: string
}

const IconButton = ({
  containerStyle,
  disabled,
  onPress,
  iconName,
  iconStyle,
  size = theme.icon.size.large,
  color,
  accessibilityLabel,
  testID = 'pressable',
}: Props) => (
  <TouchableOpacity
    testID={testID}
    accessibilityLabel={accessibilityLabel}
    style={containerStyle}
    disabled={disabled}
    onPress={disabled ? undefined : onPress}
    activeOpacity={0.5}
  >
    <Icon style={iconStyle} name={iconName} color={color} size={size} />
  </TouchableOpacity>
)

export default IconButton
