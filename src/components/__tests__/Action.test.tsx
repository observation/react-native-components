import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import Action from '../Action'

describe('Action', () => {
  describe('Rendering', () => {
    test('Neutral', () => {
      const { toJSON } = render(<Action iconName={'chevron-circle-right'} text={'Press me'} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Danger', () => {
      const { toJSON } = render(<Action type="danger" iconName={'chevron-circle-right'} text={'Press me'} />)

      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('onPress is called', () => {
      // GIVEN
      const mockFunction = jest.fn()
      const { getByText } = render(
        <Action iconName={'chevron-circle-right'} text={'Press me'} onPress={mockFunction} />,
      )

      // WHEN
      fireEvent.press(getByText('Press me'))

      // THEN
      expect(mockFunction).toHaveBeenCalled()
    })
  })
})
