import React from 'react'
import { AppState, AppStateStatus, StyleSheet } from 'react-native'

import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { act, fireEvent, render } from '@testing-library/react-native'

import SnackbarStoreContext from '../../lib/SnackbarStoreContext'
import SnackbarStore from '../../stores/SnackbarStore'
import SnackbarHost, { snackbarAutoDismissDuration } from '../SnackbarHost'

let snackbarStore: SnackbarStore

const renderOverlay = () =>
  render(
    <SnackbarStoreContext.Provider value={snackbarStore}>
      <SnackbarHost />
    </SnackbarStoreContext.Provider>,
  )

describe('SnackbarHost', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    snackbarStore = new SnackbarStore()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('Nothing is shown without a message', () => {
    // WHEN
    const { queryByTestId } = renderOverlay()

    // THEN
    expect(queryByTestId('close-button')).toBeNull()
    expect(snackbarStore.message).toBeUndefined()
  })

  test('A message is shown once the store shows it', () => {
    // GIVEN
    const { getByText } = renderOverlay()

    // WHEN
    act(() => {
      snackbarStore.show({ text: 'Hello there' })
    })

    // THEN
    expect(getByText('Hello there')).toBeTruthy()
  })

  test('Pressing the close button dismisses the message', () => {
    // GIVEN
    const onDismiss = jest.fn()
    const { getByTestId, queryByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there', closable: true, onDismiss })
    })

    // WHEN
    fireEvent.press(getByTestId('close-button'))

    // THEN
    expect(queryByText('Hello there')).toBeNull()
    expect(snackbarStore.message).toBeUndefined()
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  test('Pressing the action button dismisses the message and calls the handler', () => {
    // GIVEN
    const handler = jest.fn()
    const { getByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there', action: { text: 'Undo', onPress: handler } })
    })

    // WHEN
    fireEvent.press(getByText('Undo'))

    // THEN
    expect(snackbarStore.message).toBeUndefined()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('An auto-dismissible message dismisses itself after the auto-dismiss duration', () => {
    // GIVEN
    const { queryByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there' })
    })

    // WHEN
    act(() => jest.advanceTimersByTime(snackbarAutoDismissDuration - 1))

    // THEN
    expect(queryByText('Hello there')).toBeTruthy()

    // WHEN
    act(() => jest.advanceTimersByTime(1))

    // THEN
    expect(queryByText('Hello there')).toBeNull()
    expect(snackbarStore.message).toBeUndefined()
  })

  test('A closable message is not auto-dismissed', () => {
    // GIVEN
    const { getByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there', closable: true })
    })

    // WHEN
    act(() => jest.advanceTimersByTime(10000))

    // THEN
    expect(getByText('Hello there')).toBeTruthy()
  })

  test('A new message replaces an existing one and restarts the auto-dismiss timer', () => {
    // GIVEN
    const { getByText, queryByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'First' })
    })
    act(() => jest.advanceTimersByTime(3000))

    // WHEN
    act(() => {
      snackbarStore.show({ text: 'Second' })
    })
    act(() => jest.advanceTimersByTime(3000))

    // THEN
    expect(queryByText('First')).toBeNull()
    expect(getByText('Second')).toBeTruthy()
  })

  test('The message is positioned above the tab bar', () => {
    // GIVEN
    const { getByTestId } = renderOverlay()

    // WHEN
    act(() => {
      snackbarStore.setContentInset('tabBar', 80)
      snackbarStore.show({ text: 'Hello there' })
    })

    // THEN
    expect(StyleSheet.flatten(getByTestId('snackbar').props.style).bottom).toBe(96)
  })

  test('The message is positioned above the content insets', () => {
    // GIVEN
    const { getByTestId } = renderOverlay()

    // WHEN
    act(() => {
      snackbarStore.setContentInset('tabBar', 80)
      snackbarStore.setContentInset('actionRail', 64)
      snackbarStore.setContentInset('bottomSheet', 65)
      snackbarStore.show({ text: 'Hello there' })
    })

    // THEN
    expect(StyleSheet.flatten(getByTestId('snackbar').props.style).bottom).toBe(80 + 64 + 65 + 16)
  })

  test('The message moves when the insets change', () => {
    // GIVEN
    const { getByTestId } = renderOverlay()
    act(() => {
      snackbarStore.setContentInset('tabBar', 80)
      snackbarStore.setContentInset('bottomSheet', 65)
      snackbarStore.show({ text: 'Hello there', closable: true })
    })

    // WHEN
    act(() => snackbarStore.removeContentInset('bottomSheet'))

    // THEN
    expect(StyleSheet.flatten(getByTestId('snackbar').props.style).bottom).toBe(96)
  })

  test('The message is suppressed while a modal is open, and comes back when it is closed', () => {
    // GIVEN
    const { queryByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there', closable: true })
    })

    // WHEN
    act(() => snackbarStore.addOpenModal('modal'))

    // THEN
    expect(queryByText('Hello there')).toBeNull()
    expect(snackbarStore.message?.text).toBe('Hello there')

    // WHEN
    act(() => snackbarStore.removeOpenModal('modal'))

    // THEN
    expect(queryByText('Hello there')).toBeTruthy()
  })

  test('A message shown while a modal is open appears when the modal is closed', () => {
    // GIVEN
    const { queryByText } = renderOverlay()
    act(() => snackbarStore.addOpenModal('modal'))

    // WHEN
    act(() => {
      snackbarStore.show({ text: 'Hello there' })
    })

    // THEN
    expect(queryByText('Hello there')).toBeNull()

    // WHEN
    act(() => snackbarStore.removeOpenModal('modal'))

    // THEN
    expect(queryByText('Hello there')).toBeTruthy()
  })

  test('An auto-dismissible message gets its full duration after a modal is closed', () => {
    // GIVEN
    const { queryByText } = renderOverlay()
    act(() => {
      snackbarStore.show({ text: 'Hello there' })
    })
    act(() => snackbarStore.addOpenModal('modal'))
    act(() => jest.advanceTimersByTime(snackbarAutoDismissDuration))

    // WHEN
    act(() => snackbarStore.removeOpenModal('modal'))
    act(() => jest.advanceTimersByTime(snackbarAutoDismissDuration - 1))

    // THEN
    expect(queryByText('Hello there')).toBeTruthy()

    // WHEN
    act(() => jest.advanceTimersByTime(1))

    // THEN
    expect(queryByText('Hello there')).toBeNull()
  })
  describe('App state', () => {
    let appStateListener: ((appState: AppStateStatus) => void) | undefined
    let remove: jest.Mock

    beforeEach(() => {
      appStateListener = undefined
      remove = jest.fn()
      jest.spyOn(AppState, 'addEventListener').mockImplementation((_type, listener) => {
        appStateListener = listener
        return { remove }
      })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('When the app goes into the background, the message is hidden', () => {
      // GIVEN
      const { queryByText } = renderOverlay()
      act(() => {
        snackbarStore.show({ text: 'Hello there', closable: true })
      })

      // WHEN
      act(() => appStateListener?.('background'))

      // THEN
      expect(queryByText('Hello there')).toBeNull()
      expect(snackbarStore.isInBackground).toBe(true)
    })

    test('When the app becomes inactive, the message stays visible', () => {
      // GIVEN
      const { queryByText } = renderOverlay()
      act(() => {
        snackbarStore.show({ text: 'Hello there', closable: true })
      })

      // WHEN
      act(() => appStateListener?.('inactive'))

      // THEN
      expect(queryByText('Hello there')).toBeTruthy()
      expect(snackbarStore.isInBackground).toBe(false)
    })

    test('When the host is unmounted, it stops listening to the app state', () => {
      // GIVEN
      const { unmount } = renderOverlay()

      // WHEN
      unmount()

      // THEN
      expect(remove).toHaveBeenCalledTimes(1)
    })
  })
})
