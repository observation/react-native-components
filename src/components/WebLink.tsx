import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { theme } from '../styles'
import textStyles from '../styles/text'

type Props = {
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text: string
}

const WebLink = ({ onPress, containerStyle, text, textStyle }: Props) => (
  <IconText
    icon={<Icon name="external-link" size={theme.icon.size.medium} />}
    text={text}
    style={{
      containerStyle,
      textStyle: [textStyles.link, textStyle],
    }}
    onPress={onPress}
  />
)

export default WebLink
