import React from 'react'
import { BackHandler } from 'react-native'

import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

import useBottomSheetBackHandler from '../useBottomSheetBackHandler'

function TestComponent({ refObj }: { refObj: any }) {
  useBottomSheetBackHandler(refObj)
  return null
}

describe('useBottomSheetBackHandler', () => {
  const mockReference: React.RefObject<unknown | null> = { current: {} }

  beforeEach(() => {
    mockReference.current = {}
    jest.spyOn(BackHandler, 'addEventListener')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('When the hardware back button is pressed, the close function is called', () => {
    // GIVEN
    const close = jest.fn()
    mockReference.current = { close }
    render(
      <NavigationContainer>
        <TestComponent refObj={mockReference} />
      </NavigationContainer>,
    )

    // WHEN
    const [[event, handler]] = (BackHandler.addEventListener as jest.Mock).mock.calls as any
    const result = handler()

    // THEN
    expect(close).toHaveBeenCalledTimes(1)
    expect(event).toBe('hardwareBackPress')
    expect(result).toBe(true)
  })

  test('When the component is unmounted, the event listener is removed', () => {
    // GIVEN
    const subscription = {
      remove: jest.fn(),
    }
    jest.spyOn(BackHandler, 'addEventListener').mockReturnValue(subscription)
    const { unmount } = render(
      <NavigationContainer>
        <TestComponent refObj={mockReference} />
      </NavigationContainer>,
    )

    // WHEN
    unmount()

    // THEN
    expect(subscription.remove).toHaveBeenCalledTimes(2) // The NavigationContainer also adds a listener
  })

  test('When the BottomSheet reference is null and the back button is pressed, no action is taken', async () => {
    // GIVEN
    mockReference.current = null
    render(
      <NavigationContainer>
        <TestComponent refObj={mockReference} />
      </NavigationContainer>,
    )

    // WHEN
    const [[, handler]] = (BackHandler.addEventListener as jest.Mock).mock.calls as any
    const result = handler()

    // THEN
    expect(result).toBeUndefined()
  })
})
