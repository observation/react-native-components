import React, { ComponentType } from 'react'
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

import { Icon, IconProps } from './Icon'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?: () => void
  icon: IconProps
  accessibilityLabel?: string
  hitSlop?: TouchableOpacityProps['hitSlop']
  testID?: string
  Touchable?: ComponentType<TouchableOpacityProps>
}

const IconButton = ({
  containerStyle,
  disabled,
  onPress,
  icon,
  accessibilityLabel,
  hitSlop,
  testID = 'pressable',
  Touchable = TouchableOpacity,
}: Props) => {
  const theme = useTheme()
  return (
    <Touchable
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={containerStyle}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.5}
      hitSlop={hitSlop}
    >
      <Icon size={theme.icon.size.l} {...icon} />
    </Touchable>
  )
}

export default IconButton
