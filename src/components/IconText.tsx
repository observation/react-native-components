import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import CapitalizeText from './CapitalizeText'
import { Theme, useStyles } from '../theme'

type IconTextStyle = {
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
}

type Props = {
  icon: React.ReactElement
  text: string
  style: IconTextStyle
  onPress?: () => void
  singleLineText?: boolean
  capitalize?: boolean
}

const IconText = ({ icon, text, style, onPress, singleLineText = false, capitalize = false }: Props) => {
  const styles = useStyles(createStyles)

  const TextComponent = capitalize ? CapitalizeText : Text

  const content = (
    <View style={[styles.containerStyle, style.containerStyle]}>
      <View style={[styles.iconContainer, style.iconContainerStyle]}>{icon}</View>
      <TextComponent numberOfLines={singleLineText ? 1 : undefined} style={[{ flexShrink: 1 }, style.textStyle]}>
        {text}
      </TextComponent>
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

export default IconText

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
    },
    iconContainer: {
      justifyContent: 'center',
      marginRight: theme.margin.half,
    },
  })

  return styles
}
