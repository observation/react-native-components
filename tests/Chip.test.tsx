import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import Chip from '../src/components/Chip'

describe('Chip', () => {
  describe('Rendering', () => {
    test('Required props', () => {
      // WHEN
      const { toJSON } = render(<Chip />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('All props', () => {
      // WHEN
      const { toJSON } = render(
        <Chip
          text={'some text'}
          onPress={jest.fn()}
          containerStyle={{ flex: 1 }}
          textStyle={{ fontSize: 1 }}
          disabled={true}
        />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  test('Handle press', () => {
    // GIVE
    const onPress = jest.fn()
    const { getByText } = render(<Chip text={'some text'} onPress={onPress} />)

    // WHEN
    fireEvent.press(getByText('some text'))

    // THEN
    expect(onPress).toHaveBeenCalled()
  })

  test('Handle press should not cause error when no press is set', () => {
    // GIVE
    const onPress = jest.fn()
    const { getByText } = render(<Chip text={'some text'} onPress={onPress} disabled={true} />)

    // WHEN
    fireEvent.press(getByText('some text'))

    // THEN
    expect(onPress).not.toHaveBeenCalled()
  })
})
