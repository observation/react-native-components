/* eslint-disable observation/no-function-without-logging */

import { act } from '@testing-library/react-native'

import SnackbarStore from '../stores/SnackbarStore'

/** Text of the message in the snackbar, or `undefined` when no message is shown */
const snackbarText = (snackbarStore: SnackbarStore) => snackbarStore.message?.text

/**
 * Press the action of the message in the snackbar, the way the snackbar does: dismiss the message, then run
 * the action. Returns what the action returns, e.g. a promise.
 */
const pressSnackbarAction = (snackbarStore: SnackbarStore) => {
  const { message } = snackbarStore
  if (!message?.action) throw new Error('No snackbar message with an action is shown')

  let result: unknown
  act(() => {
    snackbarStore.dismiss(message)
    result = message.action!.onPress()
  })
  return result
}

/** Press the close button of the message in the snackbar */
const closeSnackbar = (snackbarStore: SnackbarStore) => {
  const { message } = snackbarStore
  if (!message) throw new Error('No snackbar message is shown')

  act(() => snackbarStore.dismiss(message))
}

export { closeSnackbar, pressSnackbarAction, snackbarText }
