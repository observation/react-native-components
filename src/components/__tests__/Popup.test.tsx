import React from 'react'
import { Text } from 'react-native'

import { NavigationContext } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

import { mockNavigationContext } from '../../lib/TestUtils'
import Popup from '../Popup'

describe('Popup', () => {
  test('Rendering', () => {
    const { toJSON } = render(
      <NavigationContext.Provider value={mockNavigationContext}>
        <Popup visible={true}>
          <Text>Popup</Text>
        </Popup>
      </NavigationContext.Provider>,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
