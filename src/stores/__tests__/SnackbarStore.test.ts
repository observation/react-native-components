import { beforeEach, describe, expect, jest, test } from '@jest/globals'

import SnackbarStore from '../SnackbarStore'

let snackbarStore: SnackbarStore

describe('SnackbarStore', () => {
  beforeEach(() => {
    snackbarStore = new SnackbarStore()
  })

  test('Show sets the current message', () => {
    // WHEN
    const message = snackbarStore.show({ text: 'First message' })

    // THEN
    expect(snackbarStore.message).toBe(message)
    expect(snackbarStore.message?.text).toBe('First message')
  })

  test('Show replaces the current message', () => {
    // GIVEN
    const onDismiss = jest.fn()
    snackbarStore.show({ text: 'First message', onDismiss })

    // WHEN
    snackbarStore.show({ text: 'Second message' })

    // THEN
    expect(snackbarStore.message?.text).toBe('Second message')
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('Dismiss with the current message clears it and calls its onDismiss', () => {
    // GIVEN
    const onDismiss = jest.fn()
    const message = snackbarStore.show({ text: 'First message', onDismiss })

    // WHEN
    snackbarStore.dismiss(message)

    // THEN
    expect(snackbarStore.message).toBeUndefined()
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  test('Dismiss with a stale message does not clear a newer message', () => {
    // GIVEN
    const onDismiss = jest.fn()
    const staleMessage = snackbarStore.show({ text: 'First message', onDismiss })
    snackbarStore.show({ text: 'Second message' })

    // WHEN
    snackbarStore.dismiss(staleMessage)

    // THEN
    expect(snackbarStore.message?.text).toBe('Second message')
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('A message shown from onDismiss is not cleared', () => {
    // GIVEN
    const message = snackbarStore.show({
      text: 'First message',
      onDismiss: () => snackbarStore.show({ text: 'Second message' }),
    })

    // WHEN
    snackbarStore.dismiss(message)

    // THEN
    expect(snackbarStore.message?.text).toBe('Second message')
  })

  test('Hide clears the current message without calling its onDismiss', () => {
    // GIVEN
    const onDismiss = jest.fn()
    const message = snackbarStore.show({ text: 'First message', onDismiss })

    // WHEN
    snackbarStore.hide(message)

    // THEN
    expect(snackbarStore.message).toBeUndefined()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('Hide with a stale message does not clear a newer message', () => {
    // GIVEN
    const staleMessage = snackbarStore.show({ text: 'First message' })
    snackbarStore.show({ text: 'Second message' })

    // WHEN
    snackbarStore.hide(staleMessage)

    // THEN
    expect(snackbarStore.message?.text).toBe('Second message')
  })

  test('Without content insets, the content inset is 0', () => {
    // THEN
    expect(snackbarStore.totalContentInset).toBe(0)
  })

  test('The content inset is the sum of all content insets', () => {
    // WHEN
    snackbarStore.setContentInset('actionRail', 64)
    snackbarStore.setContentInset('bottomSheet', 65)

    // THEN
    expect(snackbarStore.totalContentInset).toBe(129)
  })

  test('Setting a content inset again replaces its height', () => {
    // GIVEN
    snackbarStore.setContentInset('bottomSheet', 65)

    // WHEN
    snackbarStore.setContentInset('bottomSheet', 100)

    // THEN
    expect(snackbarStore.totalContentInset).toBe(100)
  })

  test('Removing a content inset only removes that one', () => {
    // GIVEN
    snackbarStore.setContentInset('actionRail', 64)
    snackbarStore.setContentInset('bottomSheet', 65)

    // WHEN
    snackbarStore.removeContentInset('actionRail')

    // THEN
    expect(snackbarStore.totalContentInset).toBe(65)
  })

  test('Without open modals, no modal is open', () => {
    // THEN
    expect(snackbarStore.modalOpen).toBe(false)
  })

  test('A modal is open until all open modals are removed', () => {
    // GIVEN
    snackbarStore.addOpenModal('selectItem')
    snackbarStore.addOpenModal('confirmationDialog')

    // WHEN
    snackbarStore.removeOpenModal('confirmationDialog')

    // THEN
    expect(snackbarStore.modalOpen).toBe(true)

    // WHEN
    snackbarStore.removeOpenModal('selectItem')

    // THEN
    expect(snackbarStore.modalOpen).toBe(false)
  })

  test('When the app goes into the background, the message is hidden without calling its onDismiss', () => {
    // GIVEN
    const onDismiss = jest.fn()
    snackbarStore.show({ text: 'Hello', closable: true, onDismiss })

    // WHEN
    snackbarStore.setAppState('background')

    // THEN
    expect(snackbarStore.message).toBeUndefined()
    expect(snackbarStore.isInBackground).toBe(true)
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('When the app becomes inactive, the message stays visible', () => {
    // GIVEN
    snackbarStore.show({ text: 'Hello', closable: true })

    // WHEN
    snackbarStore.setAppState('inactive')

    // THEN
    expect(snackbarStore.message?.text).toBe('Hello')
    expect(snackbarStore.isInBackground).toBe(false)
  })
})
