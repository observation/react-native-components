import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import theme from '../styles/theme'

type Props = {
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  panelStyle?: StyleProp<ViewStyle>
  topShadow?: boolean
}

/** Display content in a full width panel with a shadow */
const Panel = ({ children, topShadow = true, containerStyle, panelStyle }: Props) => {
  return (
    <View style={[styles.panelContainer, topShadow ? {} : { marginTop: 0 }, containerStyle]}>
      <View style={[styles.panel, topShadow ? {} : { paddingTop: 0, borderTopWidth: 0 }, panelStyle]}>{children}</View>
    </View>
  )
}

export default Panel

const styles = StyleSheet.create({
  panelContainer: {
    marginTop: theme.margin.quarter,
    ...theme.shadowSmall.ios,
  },
  panel: {
    paddingVertical: theme.margin.common,
    backgroundColor: theme.color.white,
    ...theme.shadowSmall.android,
    borderTopWidth: 1,
    borderColor: theme.color.greyLight,
  },
})
