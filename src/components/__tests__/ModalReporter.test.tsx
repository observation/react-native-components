import React from 'react'
import { Text } from 'react-native'

import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { useIsFocused } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

import SnackbarReporterContext, { SnackbarReporter } from '../../lib/SnackbarReporterContext'
import ModalReporter from '../ModalReporter'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual<object>('@react-navigation/native'),
  useIsFocused: jest.fn(),
}))

describe('ModalReporter', () => {
  let reporter: SnackbarReporter

  beforeEach(() => {
    jest.clearAllMocks()
    reporter = {
      setContentInset: jest.fn(),
      removeContentInset: jest.fn(),
      addOpenModal: jest.fn(),
      removeOpenModal: jest.fn(),
    }
    jest.mocked(useIsFocused).mockReturnValue(true)
  })

  const element = () => (
    <SnackbarReporterContext.Provider value={reporter}>
      <ModalReporter>
        <Text>Modal</Text>
      </ModalReporter>
    </SnackbarReporterContext.Provider>
  )

  test('While the modal is focused, it is reported as open', () => {
    // GIVEN
    render(element())

    // THEN
    expect(reporter.addOpenModal).toHaveBeenCalledWith(expect.any(String))
  })

  test('When the modal is not focused, nothing is reported', () => {
    // GIVEN
    jest.mocked(useIsFocused).mockReturnValue(false)
    render(element())

    // THEN
    expect(reporter.addOpenModal).not.toHaveBeenCalled()
  })

  test('When the modal loses focus, it is no longer reported as open', () => {
    // GIVEN
    const { rerender } = render(element())
    const [[id]] = jest.mocked(reporter.addOpenModal).mock.calls

    // WHEN
    jest.mocked(useIsFocused).mockReturnValue(false)
    rerender(element())

    // THEN
    expect(reporter.removeOpenModal).toHaveBeenCalledWith(id)
  })

  test('When the modal is closed, it is no longer reported as open', () => {
    // GIVEN
    const { unmount } = render(element())
    const [[id]] = jest.mocked(reporter.addOpenModal).mock.calls

    // WHEN
    unmount()

    // THEN
    expect(reporter.removeOpenModal).toHaveBeenCalledWith(id)
  })

  test('Without a reporter, nothing happens', () => {
    // GIVEN
    const { getByText } = render(
      <ModalReporter>
        <Text>Modal</Text>
      </ModalReporter>,
    )

    // THEN
    expect(getByText('Modal')).toBeTruthy()
    expect(reporter.addOpenModal).not.toHaveBeenCalled()
  })
})
