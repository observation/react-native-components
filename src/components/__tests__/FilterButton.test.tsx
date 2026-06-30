import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import FilterButton from '../FilterButton'

describe('FilterButton', () => {
  describe('Rendering', () => {
    test('Default props', () => {
      const { toJSON } = render(<FilterButton label={'Filter'} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Enabled', () => {
      const { getByText, toJSON } = render(<FilterButton label={'Filter'} activeFilters={3} />)
      expect(getByText('Filter')).toBeTruthy()
      expect(getByText('3')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('No active filters', () => {
      const { queryByText, toJSON } = render(<FilterButton label={'Filter'} activeFilters={0} />)
      expect(queryByText('0')).toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Calls onPress when pressed', () => {
      const onPress = jest.fn()
      const { getByText } = render(<FilterButton label={'Filter'} activeFilters={3} onPress={onPress} />)
      fireEvent.press(getByText('Filter'))
      expect(onPress).toHaveBeenCalled()
    })
  })
})
