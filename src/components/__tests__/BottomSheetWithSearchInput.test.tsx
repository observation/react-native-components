import React from 'react'
import { Keyboard } from 'react-native'

import { describe, expect, jest, test } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'

import BottomSheetWithSearchInput from '../BottomSheetWithSearchInput'

const DATA = [
  { key: 'nl', label: 'Netherlands' },
  { key: 'be', label: 'Belgium' },
  { key: 'de', label: 'Germany' },
]

function renderComponent(props: Partial<React.ComponentProps<typeof BottomSheetWithSearchInput>> = {}) {
  return render(
    <NavigationContainer>
      <BottomSheetWithSearchInput
        inputFieldPlaceholder="Start typing..."
        data={DATA}
        sectionTitle="Countries"
        onClose={jest.fn()}
        onPress={jest.fn()}
        {...props}
      />
    </NavigationContainer>,
  )
}

describe('BottomSheetWithSearchInput', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('Initial state', () => {
      const { toJSON } = renderComponent()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With selected item', () => {
      const { toJSON } = renderComponent({ selectedKey: 'nl' })
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Search input filters the list', () => {
      const { getByTestId, queryByText } = renderComponent()

      fireEvent.changeText(getByTestId('textInput'), 'Neth')

      expect(queryByText('Netherlands')).toBeTruthy()
      expect(queryByText('Belgium')).toBeNull()
    })

    test('Clear button resets the search input', () => {
      const { getByTestId, queryByText } = renderComponent()

      fireEvent.changeText(getByTestId('textInput'), 'Neth')
      fireEvent.press(getByTestId('clearButton'))

      expect(queryByText('Netherlands')).toBeTruthy()
      expect(queryByText('Belgium')).toBeTruthy()
    })
  })

  describe('Keyboard dismiss', () => {
    test('Keyboard is dismissed when an item is selected', () => {
      const dismissSpy = jest.spyOn(Keyboard, 'dismiss')
      const { getByText } = renderComponent()

      fireEvent.press(getByText('Netherlands'))

      expect(dismissSpy).toHaveBeenCalled()
    })
  })
})
