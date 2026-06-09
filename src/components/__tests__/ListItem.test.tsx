import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { IconProps } from '@observation.org/react-native-components'
import { fireEvent, render } from '@testing-library/react-native'

import { color } from '../../theme/tokens/color'
import ListItem from '../ListItem'

const onPress = jest.fn()

describe('ListItem', () => {
  describe('Rendering', () => {
    test('Rendering with radio button unselected', () => {
      // WHEN
      const { toJSON } = render(<ListItem onPress={onPress} label="Read this!" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Rendering with radio button selected', () => {
      // WHEN
      const { toJSON } = render(<ListItem onPress={onPress} label="Read this!" selected />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Rendering with sub label', () => {
      // WHEN
      const { toJSON } = render(<ListItem onPress={onPress} label="Read this!" subLabel="Really!" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Rendering with extra sub label', () => {
      // WHEN
      const { toJSON } = render(
        <ListItem onPress={onPress} label="Read this!" subLabel="Really!" extraSubLabel="Or not" />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Rendering with custom icon', () => {
      // WHEN
      const icon: IconProps = { name: 'check', color: color.grey300, size: 20, style: 'light' }
      const { toJSON } = render(<ListItem onPress={onPress} label="Read this!" icon={icon} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  test('Interaction', () => {
    // GIVEN
    const { getByText } = render(<ListItem onPress={onPress} label="Read this!" />)

    // WHEN
    fireEvent.press(getByText('Read this!'))

    // THEN
    expect(onPress).toHaveBeenCalled()
  })
})
