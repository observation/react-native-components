import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import BrandIcons, { BrandIconName } from '../lib/BrandIcons'
import theme from '../styles/theme'

type Props = {
  name: BrandIconName
  color?: string
  size?: number
}

export const BrandIcon = ({ name, color, size }: Props) => {
  const icon = BrandIcons[name]
  const iconColor = color ?? theme.color.primary500
  const iconSize = size ?? theme.icon.size.large
  const FontAwesomeIconTypeErased = FontAwesomeIcon as unknown as any

  return <FontAwesomeIconTypeErased icon={icon} color={iconColor} size={iconSize} />
}
