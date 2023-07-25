import React from 'react'

import { NavigationContext } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'

import { mockNavigationContext } from '../../lib/TestUtils'
import NotificationPopup from '../NotificationPopup'

describe('NotificationPopup', () => {
  describe('Rendering', () => {
    test('Only left button', () => {
      const { toJSON } = render(
        <NavigationContext.Provider value={mockNavigationContext}>
          <NotificationPopup
            visible={true}
            title={'Title'}
            message={'Message'}
            leftButton={{ title: 'left button', onPress: () => {} }}
          />
        </NavigationContext.Provider>,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('Left and right buttons', () => {
      const { toJSON } = render(
        <NavigationContext.Provider value={mockNavigationContext}>
          <NotificationPopup
            visible={true}
            title={'Title'}
            message={'Message'}
            leftButton={{ title: 'left button', onPress: () => {} }}
            rightButton={{ title: 'right button', onPress: () => {} }}
          />
        </NavigationContext.Provider>,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('With close button', () => {
      const { toJSON } = render(
        <NavigationContext.Provider value={mockNavigationContext}>
          <NotificationPopup
            visible={true}
            title={'Title'}
            message={'Message'}
            leftButton={{ title: 'left button', onPress: () => {} }}
            rightButton={{ title: 'right button', onPress: () => {} }}
            onClose={() => {}}
          />
        </NavigationContext.Provider>,
      )

      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click on buttons', async () => {
      // GIVEN
      const buttonFunction1 = jest.fn()
      const buttonFunction2 = jest.fn()
      const onClose = jest.fn()

      const { getByTestId, getByText } = render(
        <NavigationContext.Provider value={mockNavigationContext}>
          <NotificationPopup
            visible={true}
            title={'Title'}
            message={'Message'}
            leftButton={{ title: 'Title 1', onPress: buttonFunction1 }}
            rightButton={{ title: 'Title 2', onPress: buttonFunction2 }}
            onClose={onClose}
          />
        </NavigationContext.Provider>,
      )

      // WHEN
      await fireEvent.press(getByText('Title 1'))
      await fireEvent.press(getByText('Title 2'))
      await fireEvent.press(getByTestId('close'))

      // THEN
      expect(buttonFunction1).toBeCalledTimes(1)
      expect(buttonFunction2).toBeCalledTimes(1)
      expect(onClose).toBeCalledTimes(1)
    })
  })
})
