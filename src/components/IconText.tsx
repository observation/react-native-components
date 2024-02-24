import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import theme from '../styles/theme'

type IconTextStyle = {
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
}

type Props = {
  icon: JSX.Element
  text: string
  style: IconTextStyle
  onPress?: () => void
  singleLineText?: boolean
}

const IconText = ({ icon, text, style, onPress, singleLineText = false }: Props) => {
  const content = (
    <View style={[styles.containerStyle, style.containerStyle]}>
      <View style={[styles.iconContainer, style.iconContainerStyle]}>{icon}</View>
      <Text numberOfLines={singleLineText ? 1 : undefined} style={[{ flexShrink: 1 }, style.textStyle]}>
        {text}
      </Text>
    </View>
  )

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: theme.margin.half,
  },
})

export default IconText
