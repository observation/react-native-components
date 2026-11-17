import React from 'react'
import { Text } from 'react-native'

import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { act, render } from '@testing-library/react-native'
import { observer } from 'mobx-react-lite'

import SnackbarStoreContext from '../../lib/SnackbarStoreContext'
import SnackbarStore from '../../stores/SnackbarStore'
import { closeSnackbar, pressSnackbarAction, snackbarText } from '../../testing'
import useScreenMessage, { ScreenMessage } from '../useScreenMessage'

type ParamList = { Screen: undefined; Other: undefined }

const Stack = createStackNavigator<ParamList>()

describe('useScreenMessage', () => {
  let snackbarStore: SnackbarStore
  const navigationRef = createNavigationContainerRef<ParamList>()

  beforeEach(() => {
    snackbarStore = new SnackbarStore()
  })

  const MessageScreen = observer(({ message }: { message: ScreenMessage | undefined }) => {
    useScreenMessage(message)
    return <Text>Screen</Text>
  })

  /** Render a stack with a screen that shows the given message, and another screen to navigate to */
  const renderScreen = (message: ScreenMessage | undefined) => {
    const app = (screenMessage: ScreenMessage | undefined) => (
      <SnackbarStoreContext.Provider value={snackbarStore}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen name="Screen">{() => <MessageScreen message={screenMessage} />}</Stack.Screen>
            <Stack.Screen name="Other">{() => <Text>Other</Text>}</Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SnackbarStoreContext.Provider>
    )
    const { rerender } = render(app(message))
    return {
      setMessage: (newMessage: ScreenMessage | undefined) => rerender(app(newMessage)),
    }
  }

  const leaveScreen = () => act(() => navigationRef.navigate('Other'))
  const returnToScreen = () => act(() => navigationRef.goBack())

  test('When a message is given, it is shown', () => {
    // GIVEN
    renderScreen({ text: 'Hello', closable: true })

    // THEN
    expect(snackbarText(snackbarStore)).toBe('Hello')
    expect(snackbarStore.message?.closable).toBe(true)
  })

  test('When no message is given, nothing is shown', () => {
    // GIVEN
    renderScreen(undefined)

    // THEN
    expect(snackbarText(snackbarStore)).toBeUndefined()
  })

  test('When the message becomes undefined, it is hidden without calling onDismiss', () => {
    // GIVEN
    const onDismiss = jest.fn()
    const { setMessage } = renderScreen({ text: 'Hello', closable: true, onDismiss })

    // WHEN
    setMessage(undefined)

    // THEN
    expect(snackbarText(snackbarStore)).toBeUndefined()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('When the screen loses focus, the message is hidden without calling onDismiss', () => {
    // GIVEN
    const onDismiss = jest.fn()
    renderScreen({ text: 'Hello', closable: true, onDismiss })

    // WHEN
    leaveScreen()

    // THEN
    expect(snackbarText(snackbarStore)).toBeUndefined()
    expect(onDismiss).not.toHaveBeenCalled()
  })

  test('When the screen regains focus, the message is shown again', () => {
    // GIVEN
    renderScreen({ text: 'Hello', closable: true })
    leaveScreen()

    // WHEN
    returnToScreen()

    // THEN
    expect(snackbarText(snackbarStore)).toBe('Hello')
  })

  test('When the screen loses focus, a message shown by someone else stays visible', () => {
    // GIVEN
    renderScreen({ text: 'Hello', closable: true })
    act(() => {
      snackbarStore.show({ text: 'Other message', closable: true })
    })

    // WHEN
    leaveScreen()

    // THEN
    expect(snackbarText(snackbarStore)).toBe('Other message')
  })

  test('When the app returns from the background, the message is shown again', () => {
    // GIVEN
    renderScreen({ text: 'Hello', closable: true })
    act(() => snackbarStore.setAppState('background'))
    expect(snackbarText(snackbarStore)).toBeUndefined()

    // WHEN
    act(() => snackbarStore.setAppState('active'))

    // THEN
    expect(snackbarText(snackbarStore)).toBe('Hello')
  })

  test('When the app becomes inactive, the message stays in place', () => {
    // GIVEN
    renderScreen({ text: 'Hello', closable: true })
    const { message } = snackbarStore

    // WHEN
    act(() => snackbarStore.setAppState('inactive'))

    // THEN
    expect(snackbarStore.message).toBe(message)
  })

  test('When the user closes the message, onDismiss is called and it is not shown again on the next focus', () => {
    // GIVEN
    const onDismiss = jest.fn()
    renderScreen({ text: 'Hello', closable: true, onDismiss })

    // WHEN
    closeSnackbar(snackbarStore)
    leaveScreen()
    returnToScreen()

    // THEN
    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(snackbarText(snackbarStore)).toBeUndefined()
  })

  test('When the user presses the action, the latest action handler is called', () => {
    // GIVEN
    const onPress = jest.fn()
    const { setMessage } = renderScreen({ text: 'Hello', action: { text: 'Action', onPress: jest.fn() } })
    setMessage({ text: 'Hello', action: { text: 'Action', onPress } })

    // WHEN
    pressSnackbarAction(snackbarStore)

    // THEN
    expect(onPress).toHaveBeenCalled()
    expect(snackbarText(snackbarStore)).toBeUndefined()
  })

  test('When a dismissed message is given again after it was undefined, it is shown again', () => {
    // GIVEN
    const { setMessage } = renderScreen({ text: 'Hello', closable: true })
    closeSnackbar(snackbarStore)
    setMessage(undefined)

    // WHEN
    setMessage({ text: 'Hello', closable: true })

    // THEN
    expect(snackbarText(snackbarStore)).toBe('Hello')
  })

  test('When the component re-renders with the same text, the message is not shown again', () => {
    // GIVEN
    const { setMessage } = renderScreen({ text: 'Hello', closable: true })
    const { message } = snackbarStore

    // WHEN
    setMessage({ text: 'Hello', closable: true })

    // THEN
    expect(snackbarStore.message).toBe(message)
  })
})
