import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native'

import { Icon } from './Icon'
import Log from '../lib/Log'
import appTextStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  text: string
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const Disclose = ({ text, onPress, textStyle, containerStyle }: Props) => {
  Log.debug('Disclose')
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.containerStyle, containerStyle]}>
        <Text style={[appTextStyle.link, textStyle]}>{text}</Text>
        <Icon name="chevron-right" size={theme.icon.size.extraLarge} />
      </View>
    </TouchableOpacity>
  )
}

export default Disclose

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: theme.margin.common,
    backgroundColor: theme.color.white,
  },
})
