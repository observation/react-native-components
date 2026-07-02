import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import Log from '../lib/Log'
import { Theme, useStyles, useTheme } from '../theme'

type Props = {
  text: string
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const Disclose = ({ text, onPress, textStyle, containerStyle }: Props) => {
  Log.debug('Disclose')
  const theme = useTheme()
  const styles = useStyles(createStyles)

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.containerStyle, containerStyle]}>
        <Text style={[theme.text.link, textStyle]}>{text}</Text>
        <Icon name="chevron-right" size={theme.icon.size.xl} />
      </View>
    </TouchableOpacity>
  )
}

export default Disclose

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: theme.margin.common,
      backgroundColor: theme.color.background.system.surfaceBase,
    },
  })

  return styles
}
