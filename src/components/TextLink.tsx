import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import appTextStyle from '../styles/text'

type Props = {
  text: string
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const TextLink = ({ text, onPress, containerStyle, textStyle }: Props) => (
  <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.5}>
    <Text style={[appTextStyle.link, textStyle]}>{text}</Text>
  </TouchableOpacity>
)

export default TextLink
