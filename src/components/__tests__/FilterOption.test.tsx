import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import FilterOption from '../FilterOption'

describe('FilterOption', () => {
  describe('Rendering', () => {
    test('Default props', () => {
      const { toJSON } = render(<FilterOption title="Size" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Inactive', () => {
      const { toJSON } = render(<FilterOption title="Size" active={false} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Active', () => {
      const { toJSON } = render(<FilterOption title="Size" active={true} />)
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Calls onPress when pressed', () => {
      const onPress = jest.fn()
      const { getByText } = render(<FilterOption title="Size" active={true} onPress={onPress} />)
      fireEvent.press(getByText('Size'))
      expect(onPress).toHaveBeenCalled()
    })
  })
})
