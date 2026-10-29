import React from 'react'
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import LargeButton, { LargeButtonProps } from './LargeButton'
import useReportSnackbarInset from '../hooks/useReportSnackbarInset'
import { Theme, useStyles, useTheme } from '../theme'

type BottomActionBarProps = {
  title?: string
  text?: string
  buttons?: LargeButtonProps[]
  style?: StyleProp<ViewStyle>
  testID?: string
  children?: React.ReactNode
}

/**
 * A bar docked to the bottom of a screen, with an optional title, text, content and buttons.
 * Its height is reported to the app's snackbar, so the snackbar is shown above it.
 */
const BottomActionBar = ({ title, text, buttons = [], style, testID, children }: BottomActionBarProps) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  const onLayout = useReportSnackbarInset()

  const buttonsMarginTop = title || text ? theme.margin.common : 0
  return (
    <View style={[styles.container, style]} testID={testID} onLayout={onLayout}>
      <View style={styles.bottomActionBar}>
        {title && <Text style={theme.text.lead}>{title}</Text>}
        {text && (
          <View style={{ marginTop: theme.margin.half }}>
            <Text style={theme.text.body}>{text}</Text>
          </View>
        )}
        {children}
        {buttons.length > 0 && (
          <View style={[styles.buttonContainer, { marginTop: buttonsMarginTop }]}>
            {buttons.map((button) => (
              <LargeButton key={button.title} {...button} style={[styles.buttonStyle, button.style]} />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default BottomActionBar

export type { BottomActionBarProps }

const createStyles = (theme: Theme) => {
  const shadow = theme.shadow[theme.elevation.raised]
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.color.background.system.screen,
      borderTopWidth: 1 / 3,
      borderTopColor: theme.color.border.system.base,
      ...Platform.select({ ios: shadow.ios, android: shadow.android }),
    },
    bottomActionBar: {
      flexDirection: 'column',
      margin: theme.margin.common,
    },
    buttonContainer: {
      marginHorizontal: -theme.margin.half,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    buttonStyle: {
      flex: 1,
      margin: 0,
      marginHorizontal: theme.margin.half,
    },
  })

  return styles
}
