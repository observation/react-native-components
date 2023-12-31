import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  testID?: string
  label: string
}

const MoreInfo = ({ onPress, containerStyle, label }: Props) => (
  <IconText
    icon={<Icon name="info-circle" size={theme.icon.size.medium} />}
    text={label}
    style={{
      containerStyle,
      textStyle: textStyle.link,
    }}
    onPress={onPress}
  />
)

export default MoreInfo
