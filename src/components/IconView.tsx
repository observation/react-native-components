import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import theme from '../styles/theme'

type Props = {
  icon?: JSX.Element
  lineHeight?: number
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
}

const IconView = ({ icon, lineHeight = theme.margin.large, children, containerStyle, iconContainerStyle }: Props) => (
  <View style={[styles.containerStyle, containerStyle]}>
    {icon && (
      <View style={[styles.iconContainer, { width: lineHeight }, iconContainerStyle]}>
        <View style={[styles.iconInnerContainer, { height: lineHeight }]}>{icon}</View>
      </View>
    )}
    <View style={{ flexShrink: 1 }}>{children}</View>
  </View>
)

export default IconView

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  iconInnerContainer: {
    justifyContent: 'center',
  },
})
