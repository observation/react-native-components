import React from 'react'
import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import { IconInfo } from '../Icon'
import IconView from '../IconView'

describe('IconView', () => {
  describe('Rendering', () => {
    test('With default parameters', () => {
      const { toJSON } = render(
        <IconView>
          <Text>Text to show</Text>
        </IconView>,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('With specified parameters', () => {
      const { toJSON } = render(
        <IconView containerStyle={{ flex: 1 }} iconContainerStyle={{ flex: 1 }} icon={<IconInfo />} lineHeight={14}>
          <Text>Text to show</Text>
        </IconView>,
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
