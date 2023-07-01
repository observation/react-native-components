import React from 'react'
import { Text } from 'react-native'

import { render, fireEvent } from '@testing-library/react-native'

import Checkbox from '../Checkbox'

const mockOnPress = jest.fn()

describe('Checkbox', () => {
  describe('Rendering', () => {
    test('Checked state', () => {
      // WHEN
      const { toJSON } = render(
        <Checkbox containerStyle={{ flex: 1 }} iconContainerStyle={{ flex: 1 }} enabled onPress={mockOnPress}>
          <Text>Test checkbox</Text>
        </Checkbox>,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Unchecked state', () => {
      // WHEN
      const { toJSON } = render(
        <Checkbox enabled={false} onPress={mockOnPress}>
          <Text>Test checkbox</Text>
        </Checkbox>,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  test('Handle press', () => {
    // WHEN
    const { getByTestId } = render(
      <Checkbox enabled onPress={mockOnPress}>
        <Text>Test checkbox</Text>
      </Checkbox>,
    )

    // WHEN
    const pressable = getByTestId('pressable')
    fireEvent.press(pressable)

    // THEN
    expect(mockOnPress).toHaveBeenCalled()
  })
})
