import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { useTheme } from '../theme'

type Props = {
  text: string
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const TextLink = ({ text, onPress, containerStyle, textStyle }: Props) => {
  const theme = useTheme()
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.5}>
      <Text style={[theme.text.link, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default TextLink
