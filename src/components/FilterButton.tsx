import React from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native'

import theme from '../styles/theme'

type Props = {
  content: (_: { color: string }) => JSX.Element
  onPress?: () => void
  active?: boolean
  style?: StyleProp<ViewStyle>
}

const FilterButton = ({ content, onPress, active = false, style }: Props) => {
  const buttonStyle = active ? styles.activeButton : styles.button
  const contentColor = active ? theme.color.white : theme.color.greyDark
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
    ...theme.rounded,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.color.white,
  },
  activeButton: {
    backgroundColor: theme.color.primary,
  },
})
