import React from 'react'
import { Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'

import BottomSheet from '../BottomSheet'

describe('BottomSheet', () => {
  describe('Rendering', () => {
    test('Without icon', () => {
      // GIVEN
      const { toJSON } = render(
        <NavigationContainer>
          <BottomSheet title="Title" text="Text" />
        </NavigationContainer>,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With button', () => {
      // GIVEN
      const { toJSON } = render(
        <NavigationContainer>
          <BottomSheet title="Title" text="Text" buttons={[{ onPress: () => {}, title: 'Action!' }]} />
        </NavigationContainer>,
      )
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Only buttons', () => {
      // GIVEN
      const { toJSON } = render(
        <NavigationContainer>
          <BottomSheet buttons={[{ onPress: () => {}, title: 'Action!' }]} />
        </NavigationContainer>,
      )
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With children', () => {
      // GIVEN
      const { queryByText, toJSON } = render(
        <NavigationContainer>
          <BottomSheet>
            <Text>Hello world!</Text>
          </BottomSheet>
        </NavigationContainer>,
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
      const { getByText } = render(
        <NavigationContainer>
          <BottomSheet title="Title" text="Text" buttons={[{ onPress, title: 'Action!' }]} />
        </NavigationContainer>,
      )

      // WHEN
      fireEvent.press(getByText('Action!'))

      // THEN
      expect(onPress).toBeCalled()
    })
  })
})
