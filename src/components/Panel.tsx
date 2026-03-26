import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { Theme } from '../@types/theme'
import { shadow } from '../styles'
import { useStyles } from '../theme/ThemeProvider'

type Props = {
  children?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  panelStyle?: StyleProp<ViewStyle>
  topShadow?: boolean
}

/** Display content in a full width panel with a shadow */
const Panel = ({ children, topShadow = true, containerStyle, panelStyle }: Props) => {
  const styles = useStyles(createStyles)
  return (
    <View style={[styles.panelContainer, topShadow ? {} : { marginTop: 0 }, containerStyle]}>
      <View style={[styles.panel, topShadow ? {} : { paddingTop: 0, borderTopWidth: 0 }, panelStyle]}>{children}</View>
    </View>
  )
}

export default Panel

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    panelContainer: {
      marginTop: theme.margin.quarter,
      ...shadow.small.ios,
    },
    panel: {
      paddingVertical: theme.margin.common,
      backgroundColor: theme.color.white,
      ...shadow.small.android,
      borderTopWidth: 1,
      borderColor: theme.color.grey50,
    },
  })
