import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import Disclose from '../Disclose'

const onPress = jest.fn()

describe('Disclose', () => {
  describe('Rendering', () => {
    test('Only text', () => {
      // WHEN
      const { toJSON } = render(<Disclose text="some text" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Styles and callback', () => {
      // GIVEN
      const { toJSON } = render(
        <Disclose text="some text" containerStyle={{ flex: 1 }} textStyle={{ fontSize: 1 }} onPress={onPress} />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  test('Interaction', () => {
    // GIVEN
    const { getByText } = render(<Disclose text="some text" onPress={onPress} />)

    // WHEN
    fireEvent.press(getByText(/some text/))

    // THEN
    expect(onPress).toBeCalled()
  })
})
