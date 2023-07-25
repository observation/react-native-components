import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { IconExternalLink } from './Icon'
import IconText from './IconText'
import textStyles from '../styles/text'

type Props = {
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text: string
}

const WebLink = ({ onPress, containerStyle, text, textStyle }: Props) => (
  <IconText
    icon={<IconExternalLink />}
    text={text}
    style={{
      containerStyle,
      textStyle: [textStyles.link, textStyle],
    }}
    onPress={onPress}
  />
)

export default WebLink
