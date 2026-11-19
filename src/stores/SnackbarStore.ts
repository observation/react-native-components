import { AppState, AppStateStatus } from 'react-native'

import { action, computed, makeObservable, observable } from 'mobx'

import { SnackbarMessage, SnackbarMessageParams } from './SnackbarMessage'
import Log from '../lib/Log'
import { SnackbarReporter } from '../lib/SnackbarReporterContext'

class SnackbarStore implements SnackbarReporter {
  message: SnackbarMessage | undefined = undefined

  /** State of the app, set by the `SnackbarHost` */
  appState: AppStateStatus = AppState.currentState as AppStateStatus

  /**
   * Heights of the UI elements at the bottom of the focused screen, such as the tab bar, an action rail or a
   * bottom sheet. The bottom safe area inset is not included.
   */
  contentInsets = new Map<string, number>()

  /** Modal screens that are open, such as a bottom sheet picker. The snackbar is suppressed while one is open. */
  openModals = new Set<string>()

  constructor() {
    makeObservable(this, {
      message: observable.ref,
      show: action,
      dismiss: action,
      hide: action,
      appState: observable,
      isInBackground: computed,
      setAppState: action.bound,
      contentInsets: observable,
      totalContentInset: computed,
      openModals: observable,
      modalOpen: computed,
      setContentInset: action.bound,
      removeContentInset: action.bound,
      addOpenModal: action.bound,
      removeOpenModal: action.bound,
    })
  }

  /** Show a message, replacing the current one */
  show(params: SnackbarMessageParams) {
    Log.debug('SnackbarStore:show', params.text)
    this.message = new SnackbarMessage(params)
    return this.message
  }

  /**
   * Dismiss the given message if it is still the current one, and call its `onDismiss` callback.
   * The callback is not called when the message is replaced or hidden.
   */
  dismiss(message: SnackbarMessage) {
    Log.debug('SnackbarStore:dismiss')
    if (message !== this.message) return
    this.message = undefined
    message.onDismiss?.()
  }

  /** Hide the given message if it is still the current one, without calling its `onDismiss` callback */
  hide(message: SnackbarMessage) {
    Log.debug('SnackbarStore:hide')
    if (message === this.message) {
      this.message = undefined
    }
  }

  get isInBackground() {
    Log.debug('SnackbarStore:isInBackground')
    return this.appState === 'background'
  }

  /** A message from before the user left the app is no longer relevant when coming back, so it is hidden */
  setAppState(appState: AppStateStatus) {
    Log.debug('SnackbarStore:setAppState', appState)
    this.appState = appState
    if (this.isInBackground && this.message) {
      this.hide(this.message)
    }
  }

  /** Whether a modal screen is open, in which case the snackbar is suppressed until it is closed */
  get modalOpen() {
    Log.debug('SnackbarStore:modalOpen')
    return this.openModals.size > 0
  }

  addOpenModal(id: string) {
    Log.debug('SnackbarStore:addOpenModal', id)
    this.openModals.add(id)
  }

  removeOpenModal(id: string) {
    Log.debug('SnackbarStore:removeOpenModal', id)
    this.openModals.delete(id)
  }

  /** Total height of the UI elements at the bottom of the focused screen */
  get totalContentInset() {
    Log.debug('SnackbarStore:totalContentInset')
    let total = 0
    this.contentInsets.forEach((height) => (total += height))
    return total
  }

  setContentInset(id: string, height: number) {
    Log.debug('SnackbarStore:setContentInset', id, height)
    this.contentInsets.set(id, height)
  }

  removeContentInset(id: string) {
    Log.debug('SnackbarStore:removeContentInset', id)
    this.contentInsets.delete(id)
  }
}

export default SnackbarStore
