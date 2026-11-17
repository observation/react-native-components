import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'

import { Icon } from './Icon'
import Log from '../lib/Log'
import { SnackbarMessage } from '../stores/SnackbarMessage'
import { layout } from '../styles'
import { Theme, useStyles, useTheme } from '../theme'

const entering = FadeInDown.duration(240)
const exiting = FadeOut.duration(140)

type Props = {
  message: SnackbarMessage
  bottomOffset: number
  onDismiss: () => void
}

/** Presentational snackbar, rendered by the `SnackbarHost` */
const Snackbar = ({ message, onDismiss, bottomOffset }: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  const onAction = () => {
    Log.debug('Snackbar:onAction')
    onDismiss()
    message.action?.onPress()
  }

  return (
    <Animated.View
      testID="snackbar"
      entering={entering}
      exiting={exiting}
      style={[styles.container, { bottom: bottomOffset }]}
      pointerEvents="box-none"
    >
      <View style={styles.snackbarContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{message.text}</Text>
          {!message.isAutoDismissible && (
            <TouchableOpacity
              testID="close-button"
              onPress={onDismiss}
              style={styles.closeContainer}
              hitSlop={layout.hitSlop}
            >
              <Icon name="xmark" color={theme.color.icon.system.speciesStrong} size={theme.icon.size.xl} />
            </TouchableOpacity>
          )}
        </View>
        {message.action && (
          <TouchableOpacity onPress={onAction} style={styles.actionContainer} hitSlop={layout.hitSlop}>
            <Text style={styles.actionText}>{message.action.text}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  )
}

export default Snackbar

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      marginHorizontal: theme.margin.common,
    },
    snackbarContainer: {
      flexDirection: 'column',
      gap: theme.margin.half,
      backgroundColor: theme.color.background.system.surfacePopped,
      paddingVertical: 14,
      paddingHorizontal: theme.margin.common,
      borderRadius: 4,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
      flexShrink: 1,
    },
    closeContainer: {
      alignItems: 'flex-end',
      alignSelf: 'flex-start',
      marginLeft: theme.margin.quarter,
    },
    actionContainer: {
      alignSelf: 'flex-end',
    },
    actionText: {
      ...theme.text.body,
      color: theme.color.text.system.speciesStrong,
    },
  })
  return styles
}
