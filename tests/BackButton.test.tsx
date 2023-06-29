import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import { mockNavigation } from './lib/TestUtils'

import BackButton from '../src/components/BackButton'

describe('BackButton', () => {
  test('Rendering', () => {
    const { toJSON } = render(<BackButton navigation={mockNavigation} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Interactivity', () => {
    // GIVEN
    const { getByTestId } = render(<BackButton navigation={mockNavigation} />)

    // WHEN
    fireEvent.press(getByTestId('pressable'))

    // THEN
    expect(mockNavigation.goBack).toBeCalled()
  })
})
