import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { IconProps } from '../Icon'
import IconButton from '../IconButton'

describe('IconButton', () => {
  const icon: IconProps = { name: 'chevron-left', size: 20, color: 'black' }
  test('Rendering', () => {
    // GIVEN
    const { toJSON } = render(<IconButton containerStyle={{ flex: 1 }} disabled={false} icon={icon} />)

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })

  test('Handle press when enabled', () => {
    // GIVEN
    const mockOnPress = jest.fn()
    const { getByTestId } = render(<IconButton disabled={false} onPress={mockOnPress} icon={icon} />)

    // WHEN
    const pressable = getByTestId('pressable')
    fireEvent.press(pressable)

    // THEN
    expect(mockOnPress).toHaveBeenCalled()
  })

  test('Do not handle press when disabled', () => {
    // GIVEN
    const mockOnPress = jest.fn()
    const { getByTestId } = render(<IconButton disabled onPress={mockOnPress} icon={icon} />)

    // WHEN
    const pressable = getByTestId('pressable')
    fireEvent.press(pressable)

    // THEN
    expect(mockOnPress).toHaveBeenCalledTimes(0)
  })
})
