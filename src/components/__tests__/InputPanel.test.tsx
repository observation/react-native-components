import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import { color } from '../../theme/tokens/color'
import InputPanel from '../InputPanel'

describe('InputPanel', () => {
  const onPress = jest.fn()

  describe('Rendering', () => {
    test('With content', () => {
      const { toJSON } = render(<InputPanel label={'Counting method'} value={'seen'} onPress={onPress} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('No label', () => {
      const { toJSON } = render(<InputPanel value={'Netherlands'} onPress={onPress} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('No value', () => {
      const { toJSON } = render(<InputPanel label={'Counting method'} onPress={onPress} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Disabled', () => {
      const { toJSON } = render(<InputPanel label={'Counting method'} value={'seen'} onPress={onPress} disabled />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Capitalize value', () => {
      const { toJSON, queryByText } = render(
        <InputPanel label={'Counting method'} value={'seen'} onPress={onPress} capitalize />,
      )

      expect(queryByText('Seen')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without chevron', () => {
      const { toJSON } = render(
        <InputPanel label={'Counting method'} value={'seen'} onPress={onPress} showChevron={false} />,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('With value style', () => {
      const { toJSON } = render(
        <InputPanel
          label={'Counting method'}
          value={'seen'}
          onPress={onPress}
          valueStyle={{ color: color.primary500 }}
        />,
      )

      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click', async () => {
      // GIVEN
      const { getByText } = render(<InputPanel label={'Counting method'} value={'seen'} onPress={onPress} />)

      // WHEN
      await fireEvent.press(getByText('Counting method'))

      // THEN
      expect(onPress).toHaveBeenCalledTimes(1)
    })
  })
})
