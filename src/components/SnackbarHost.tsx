import React, { useEffect } from 'react'
import { AppState, AppStateStatus, StyleSheet, View } from 'react-native'

import { observer } from 'mobx-react-lite'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Snackbar from './Snackbar'
import Log from '../lib/Log'
import { useSnackbarStore } from '../lib/SnackbarStoreContext'
import { useTheme } from '../theme'

/** Time in ms before a message without a close button or action is dismissed */
const snackbarAutoDismissDuration = 4000

/**
 * Overlay on top of the app that shows the message of the snackbar store. Place it once in the root of the app,
 * after the navigation.
 */
const SnackbarHost = () => {
  const theme = useTheme()
  const snackbarStore = useSnackbarStore()
  const { modalOpen } = snackbarStore
  const visibleMessage = modalOpen ? undefined : snackbarStore.message
  const insets = useSafeAreaInsets()

  useEffect(() => {
    Log.debug('SnackbarHost:useEffect appState')
    snackbarStore.setAppState(AppState.currentState as AppStateStatus)
    const subscription = AppState.addEventListener('change', snackbarStore.setAppState)
    return () => subscription.remove()
  }, [snackbarStore])

  useEffect(() => {
    if (!visibleMessage || !visibleMessage.isAutoDismissible) return

    const timeout = setTimeout(() => {
      snackbarStore.dismiss(visibleMessage)
    }, snackbarAutoDismissDuration)
    return () => clearTimeout(timeout)
  }, [visibleMessage, snackbarStore])

  const { totalContentInset } = snackbarStore

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {visibleMessage && (
        <Snackbar
          key={visibleMessage.id}
          message={visibleMessage}
          bottomOffset={insets.bottom + totalContentInset + theme.margin.common}
          onDismiss={() => snackbarStore.dismiss(visibleMessage)}
        />
      )}
    </View>
  )
}

export default observer(SnackbarHost)
export { snackbarAutoDismissDuration }

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
  },
})
