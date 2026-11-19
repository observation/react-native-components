import { useCallback, useEffect, useRef, useState } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import Log from '../lib/Log'
import { useSnackbarStore } from '../lib/SnackbarStoreContext'
import { SnackbarMessageParams } from '../stores/SnackbarMessage'

export type ScreenMessage = SnackbarMessageParams

/**
 * Show a message about the state of the screen, as long as `message` is defined and the screen has focus.
 *
 * This is a solution for messages that are shown as snackbar but describe the state of a screen.
 * The message is hidden when the screen loses focus or the app goes to the background, and shown again when the
 * screen regains focus or the app returns. Once the user dismisses it, it is not shown again until `message` has
 * been undefined.
 *
 * The caller must be an `observer`, so it re-renders when the app goes to or returns from the background.
 */
const useScreenMessage = (message: ScreenMessage | undefined) => {
  const snackbarStore = useSnackbarStore()
  const { isInBackground } = snackbarStore
  const text = message?.text

  const [dismissedText, setDismissedText] = useState<string>()

  // The latest callbacks, so a re-render with new callbacks does not show the message again
  const messageRef = useRef(message)
  useEffect(() => {
    messageRef.current = message
  })

  useEffect(() => {
    if (!text) {
      setDismissedText(undefined)
    }
  }, [text])

  useFocusEffect(
    useCallback(() => {
      Log.debug('useScreenMessage:focus', text)
      if (!text || text === dismissedText || isInBackground) return

      const { closable, action } = messageRef.current ?? {}
      const shownMessage = snackbarStore.show({
        text,
        closable,
        action: action && {
          text: action.text,
          onPress: () => messageRef.current?.action?.onPress(),
        },
        onDismiss: () => {
          Log.debug('useScreenMessage:onDismiss', text)
          setDismissedText(text)
          messageRef.current?.onDismiss?.()
        },
      })

      return () => {
        Log.debug('useScreenMessage:blur', text)
        snackbarStore.hide(shownMessage)
      }
    }, [dismissedText, isInBackground, snackbarStore, text]),
  )
}

export default useScreenMessage
