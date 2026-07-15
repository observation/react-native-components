import React from 'react'

import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import FilterSelectField from '../FilterSelectField'

describe('FilterSelectField', () => {
  const onPress = jest.fn()
  const onClear = jest.fn()

  beforeEach(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('No value selected', () => {
      // WHEN
      const { toJSON, getByText, queryByTestId } = render(
        <FilterSelectField
          testID="filterField"
          isActive={false}
          value={undefined}
          placeholder="Placeholder"
          onPress={onPress}
          onClear={onClear}
        />,
      )

      // THEN
      expect(getByText('Placeholder')).toBeTruthy()
      expect(queryByTestId('filterField-clear')).toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Value selected', () => {
      // GIVEN

      // WHEN
      const { toJSON, getByText, queryByTestId } = render(
        <FilterSelectField
          testID="filterField"
          isActive={true}
          value="Birds"
          placeholder="Placeholder"
          onPress={onPress}
          onClear={onClear}
        />,
      )

      // THEN
      expect(getByText('Birds')).toBeTruthy()
      expect(queryByTestId('filterField-clear')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('When input field is pressed, calls onPress', () => {
      // GIVEN
      const { getByText } = render(
        <FilterSelectField
          testID="filterField"
          isActive={true}
          value="Birds"
          placeholder="Placeholder"
          onPress={onPress}
          onClear={onClear}
        />,
      )
      const inputPanel = getByText('Birds')

      // WHEN
      fireEvent.press(inputPanel)

      // THEN
      expect(onPress).toHaveBeenCalled()
    })

    test('When clear button is pressed, calls onClear', () => {
      // GIVEN
      const { getByTestId } = render(
        <FilterSelectField
          testID="filterField"
          isActive={true}
          value="Birds"
          placeholder="Placeholder"
          onPress={onPress}
          onClear={onClear}
        />,
      )
      const clearButton = getByTestId('filterField-clear')

      // WHEN
      fireEvent.press(clearButton)

      // THEN
      expect(onClear).toHaveBeenCalled()
    })
  })
})
