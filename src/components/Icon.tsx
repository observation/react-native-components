import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Icons, { IconName } from '../lib/Icons'
import { useTheme } from '../theme/ThemeProvider'

export type IconStyleProp = 'light' | 'solid'

export type IconAppearanceProps = {
  style?: IconStyleProp
  color?: string
  size?: number
  testID?: string
  rotation?: number
}

export type IconProps = IconAppearanceProps & {
  name: IconName
}

export const Icon = ({ name, color, size, testID, style, rotation }: IconProps): React.ReactElement => {
  const theme = useTheme()
  const iconStyle = style ?? 'light'
  const icon = iconStyle === 'light' ? Icons[name].light : Icons[name].solid
  const iconColor = color ?? theme.color.icon.system.brand
  const iconSize = size ?? theme.icon.size.l
  const transform = rotation ? { rotate: rotation } : undefined

  return <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} testID={testID} transform={transform} />
}
