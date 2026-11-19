import React from 'react'
import { Text } from 'react-native'

import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import SnackbarReporterContext, { SnackbarReporter } from '../../lib/SnackbarReporterContext'
import TabBarInsetReporter from '../TabBarInsetReporter'

jest.mock('@react-navigation/bottom-tabs', () => ({
  ...jest.requireActual<object>('@react-navigation/bottom-tabs'),
  useBottomTabBarHeight: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual<object>('@react-navigation/native'),
  useIsFocused: jest.fn(),
}))

describe('TabBarInsetReporter', () => {
  let reporter: SnackbarReporter

  beforeEach(() => {
    jest.clearAllMocks()
    reporter = {
      setContentInset: jest.fn(),
      removeContentInset: jest.fn(),
      addOpenModal: jest.fn(),
      removeOpenModal: jest.fn(),
    }
    jest.mocked(useBottomTabBarHeight).mockReturnValue(83)
    jest.mocked(useSafeAreaInsets).mockReturnValue({ top: 0, right: 0, bottom: 34, left: 0 })
    jest.mocked(useIsFocused).mockReturnValue(true)
  })

  const element = () => (
    <SnackbarReporterContext.Provider value={reporter}>
      <TabBarInsetReporter>
        <Text>Tab</Text>
      </TabBarInsetReporter>
    </SnackbarReporterContext.Provider>
  )

  test('When the tab is focused, the tab bar height without the bottom safe area inset is reported', () => {
    // GIVEN
    render(element())

    // THEN
    expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 83 - 34)
  })

  test('When the tab is not focused, nothing is reported', () => {
    // GIVEN
    jest.mocked(useIsFocused).mockReturnValue(false)
    render(element())

    // THEN
    expect(reporter.setContentInset).not.toHaveBeenCalled()
  })

  test('When the tab loses focus, the height is removed', () => {
    // GIVEN
    const { rerender } = render(element())
    const [[id]] = jest.mocked(reporter.setContentInset).mock.calls

    // WHEN
    jest.mocked(useIsFocused).mockReturnValue(false)
    rerender(element())

    // THEN
    expect(reporter.removeContentInset).toHaveBeenCalledWith(id)
  })

  test('The reported height is never negative', () => {
    // GIVEN
    jest.mocked(useBottomTabBarHeight).mockReturnValue(0)
    render(element())

    // THEN
    expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 0)
  })

  test('Without a reporter, nothing happens', () => {
    // GIVEN
    render(
      <TabBarInsetReporter>
        <Text>Tab</Text>
      </TabBarInsetReporter>,
    )

    // THEN
    expect(reporter.setContentInset).not.toHaveBeenCalled()
  })
})
