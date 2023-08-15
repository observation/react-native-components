import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { IconInfo } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  testID?: string
  label: string
  icon?: JSX.Element
}

const defaultIcon = <IconInfo size={theme.icon.size.medium} />
const MoreInfo = ({ onPress, containerStyle, icon = defaultIcon, label }: Props) => (
  <IconText
    icon={icon}
    text={label}
    style={{
      containerStyle,
      textStyle: textStyle.link,
    }}
    onPress={onPress}
  />
)

export default MoreInfo
