import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import IconButton from '../src/components/IconButton'

describe('IconButton', () => {
  test('Rendering', () => {
    // GIVEN
    const { toJSON } = render(
      <IconButton containerStyle={{ flex: 1 }} disabled={false} iconName="back" size={20} color="black" />,
    )

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })

  test('Handle press when enabled', () => {
    // GIVEN
    const mockOnPress = jest.fn()
    const { getByTestId } = render(
      <IconButton disabled={false} onPress={mockOnPress} iconName="back" size={20} color="black" />,
    )

    // WHEN
    const pressable = getByTestId('pressable')
    fireEvent.press(pressable)

    // THEN
    expect(mockOnPress).toHaveBeenCalled()
  })

  test('Do not handle press when disabled', () => {
    // GIVEN
    const mockOnPress = jest.fn()
    const { getByTestId } = render(
      <IconButton disabled onPress={mockOnPress} iconName="back" size={20} color="black" />,
    )

    // WHEN
    const pressable = getByTestId('pressable')
    fireEvent.press(pressable)

    // THEN
    expect(mockOnPress).toHaveBeenCalledTimes(0)
  })
})
