import React from 'react'
import { Text } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import BottomSheet from '../BottomSheet'

describe('BottomSheet', () => {
  describe('Rendering', () => {
    test('Without icon', () => {
      // GIVEN
      const { toJSON } = render(<BottomSheet title="Title" text="Text" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With button', () => {
      // GIVEN
      const { toJSON } = render(
        <BottomSheet title="Title" text="Text" buttons={[{ onPress: () => {}, title: 'Action!' }]} />,
      )
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Only buttons', () => {
      // GIVEN
      const { toJSON } = render(<BottomSheet buttons={[{ onPress: () => {}, title: 'Action!' }]} />)
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With children', () => {
      // GIVEN
      const { queryByText, toJSON } = render(
        <BottomSheet>
          <Text>Hello world!</Text>
        </BottomSheet>,
      )

      // THEN
      expect(queryByText('Hello world!')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click on a button', () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByText } = render(<BottomSheet title="Title" text="Text" buttons={[{ onPress, title: 'Action!' }]} />)

      // WHEN
      fireEvent.press(getByText('Action!'))

      // THEN
      expect(onPress).toBeCalled()
    })
  })
})
