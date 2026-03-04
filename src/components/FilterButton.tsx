import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

import { rounded, theme } from '../styles'

type Props = {
  content: (_: { color: string }) => React.ReactElement
  onPress?: () => void
  active?: boolean
  style?: StyleProp<ViewStyle>
}

const FilterButton = ({ content, onPress, active = false, style }: Props) => {
  const buttonStyle = active ? styles.activeButton : styles.button
  const contentColor = active ? theme.color.white : theme.color.grey800
  return (
    <TouchableOpacity
      testID="touchable-opacity"
      style={[styles.container, style, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      {content({ color: contentColor })}
    </TouchableOpacity>
  )
}

export default FilterButton

const styles = StyleSheet.create({
  container: {
    ...rounded.normal,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.color.white,
  },
  activeButton: {
    backgroundColor: theme.color.primary500,
  },
})
