import React from 'react'
import { LayoutChangeEvent } from 'react-native'

import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { NavigationContext } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-native'

import SnackbarReporterContext, { SnackbarReporter } from '../../lib/SnackbarReporterContext'
import useReportSnackbarInset from '../useReportSnackbarInset'

type Listener = () => void

describe('useReportSnackbarInset', () => {
  let reporter: SnackbarReporter
  let focused: boolean
  let listeners: Record<string, Listener[]>
  let navigation: any

  beforeEach(() => {
    reporter = {
      setContentInset: jest.fn(),
      removeContentInset: jest.fn(),
      addOpenModal: jest.fn(),
      removeOpenModal: jest.fn(),
    }
    focused = true
    listeners = { focus: [], blur: [] }
    navigation = {
      isFocused: () => focused,
      addListener: (event: string, listener: Listener) => {
        listeners[event].push(listener)
        return () => {
          listeners[event] = listeners[event].filter((l) => l !== listener)
        }
      },
    }
  })

  const layoutEvent = (height: number) =>
    ({ nativeEvent: { layout: { x: 0, y: 0, width: 0, height } } }) as LayoutChangeEvent

  /** Simulate a navigation event for the screen */
  const emit = (event: 'focus' | 'blur') => {
    focused = event === 'focus'
    act(() => listeners[event].forEach((listener) => listener()))
  }

  const renderUseSnackbarInset = (
    extraHeight?: number,
    { withReporter = true, withNavigation = true }: { withReporter?: boolean; withNavigation?: boolean } = {},
  ) =>
    renderHook(() => useReportSnackbarInset(extraHeight), {
      wrapper: ({ children }: { children: React.ReactNode }) => {
        const content = withNavigation ? (
          <NavigationContext.Provider value={navigation}>{children}</NavigationContext.Provider>
        ) : (
          children
        )
        return withReporter ? (
          <SnackbarReporterContext.Provider value={reporter}>{content}</SnackbarReporterContext.Provider>
        ) : (
          <>{content}</>
        )
      },
    })

  describe('Without a reporter or navigation', () => {
    test('Without a reporter, no layout handler is returned', () => {
      // WHEN
      const { result } = renderUseSnackbarInset(undefined, { withReporter: false })

      // THEN
      expect(result.current).toBeUndefined()
    })

    test('Without navigation, no layout handler is returned', () => {
      // WHEN
      const { result } = renderUseSnackbarInset(undefined, { withNavigation: false })

      // THEN
      expect(result.current).toBeUndefined()
    })
  })

  describe('Reporting', () => {
    test('Nothing is reported before the element is laid out', () => {
      // WHEN
      renderUseSnackbarInset()

      // THEN
      expect(reporter.setContentInset).not.toHaveBeenCalled()
    })

    test('When laid out on a focused screen, the height is reported', () => {
      // GIVEN
      const { result } = renderUseSnackbarInset()

      // WHEN
      act(() => result.current!(layoutEvent(65)))

      // THEN
      expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 65)
    })

    test('The extra height is added to the reported height', () => {
      // GIVEN
      const { result } = renderUseSnackbarInset(8)

      // WHEN
      act(() => result.current!(layoutEvent(56)))

      // THEN
      expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 64)
    })

    test('When laid out on a screen that is not focused, nothing is reported', () => {
      // GIVEN
      focused = false
      const { result } = renderUseSnackbarInset()

      // WHEN
      act(() => result.current!(layoutEvent(65)))

      // THEN
      expect(reporter.setContentInset).not.toHaveBeenCalled()
    })

    test('When the screen loses focus, the height is removed', () => {
      // GIVEN
      const { result } = renderUseSnackbarInset()
      act(() => result.current!(layoutEvent(65)))
      const [[id]] = (reporter.setContentInset as jest.Mock).mock.calls as [[string]]

      // WHEN
      emit('blur')

      // THEN
      expect(reporter.removeContentInset).toHaveBeenCalledWith(id)
    })

    test('When the screen gets focus again, the height is reported again', () => {
      // GIVEN
      const { result } = renderUseSnackbarInset()
      act(() => result.current!(layoutEvent(65)))
      emit('blur')
      jest.clearAllMocks()

      // WHEN
      emit('focus')

      // THEN
      expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 65)
    })

    test('When the element is removed, the height is removed', () => {
      // GIVEN
      const { result, unmount } = renderUseSnackbarInset()
      act(() => result.current!(layoutEvent(65)))
      const [[id]] = (reporter.setContentInset as jest.Mock).mock.calls as [[string]]

      // WHEN
      unmount()

      // THEN
      expect(reporter.removeContentInset).toHaveBeenCalledWith(id)
    })

    test('When the height changes, the new height replaces the old one', () => {
      // GIVEN
      const { result } = renderUseSnackbarInset()
      act(() => result.current!(layoutEvent(65)))

      // WHEN
      act(() => result.current!(layoutEvent(100)))

      // THEN
      expect(reporter.setContentInset).toHaveBeenLastCalledWith(expect.any(String), 100)
    })
  })
})
