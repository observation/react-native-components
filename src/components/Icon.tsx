import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Icons, { IconName } from '../lib/Icons'
import theme from '../styles/theme'

export type IconStyleProp = 'light' | 'solid'

type IconAppearanceProps = {
  style?: IconStyleProp
  color?: string
  size?: number
  testID?: string
}

type IconProps = IconAppearanceProps & {
  name: IconName
}

export const Icon = ({ name, color, size, testID, style }: IconProps): JSX.Element => {
  const iconStyle = style ?? 'light'
  const icon = iconStyle === 'light' ? Icons[name].light : Icons[name].solid
  const iconColor = color ?? theme.color.primary
  const iconSize = size ?? theme.icon.size.large

  return <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} testID={testID} />
}
