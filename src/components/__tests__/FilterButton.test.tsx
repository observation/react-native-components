import React from 'react'
import { Text } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import theme from '../../styles/theme'
import FilterButton from '../FilterButton'

const content = jest.fn(({}) => <Text>Some text</Text>)
const onPress = jest.fn()

describe('FilterButton', () => {
  describe('Rendering', () => {
    test('Enabled', () => {
      const { toJSON } = render(<FilterButton content={content} active onPress={onPress} style={{ flex: 1 }} />)
      expect(toJSON()).toMatchSnapshot()
      expect(content).toBeCalledWith({ color: theme.color.white })
    })

    test('Disabled', () => {
      const { toJSON } = render(<FilterButton content={content} active={false} style={{ flex: 1 }} />)
      expect(toJSON()).toMatchSnapshot()
      expect(content).toBeCalledWith({ color: theme.color.greyDark })
    })
  })

  describe('Interaction', () => {
    test('Click', async () => {
      const { getByText } = render(
        <FilterButton content={content} active={false} onPress={onPress} style={{ flex: 1 }} />,
      )
      await fireEvent.press(getByText('Some text'))
      expect(onPress).toBeCalled()
    })
  })
})
