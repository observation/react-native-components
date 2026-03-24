import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { useTheme } from '../theme/ThemeProvider'

type Props = {
  icon?: React.ReactElement
  lineHeight?: number
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
}

const IconView = ({ icon, lineHeight, children, containerStyle, iconContainerStyle }: Props) => {
  const theme = useTheme()
  const size = lineHeight ?? theme.margin.large
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {icon && (
        <View style={[styles.iconContainer, { width: size }, iconContainerStyle]}>
          <View style={[styles.iconInnerContainer, { height: size }]}>{icon}</View>
        </View>
      )}
      <View style={{ flexShrink: 1 }}>{children}</View>
    </View>
  )
}

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
