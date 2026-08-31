import React from 'react'
import { Text } from 'react-native'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import IconText from '../IconText'

describe('IconText', () => {
  const icon = <Text>icon</Text>

  describe('Rendering', () => {
    test('With content', () => {
      const { toJSON } = render(<IconText icon={icon} text={'Some text'} style={{}} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Single line text', () => {
      const { toJSON } = render(<IconText icon={icon} text={'Some text'} style={{}} singleLineText />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Capitalize text', () => {
      const { toJSON, queryByText } = render(<IconText icon={icon} text={'some text'} style={{}} capitalize />)

      expect(queryByText('Some text')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click', async () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByText } = render(<IconText icon={icon} text={'Some text'} style={{}} onPress={onPress} />)

      // WHEN
      await fireEvent.press(getByText('Some text'))

      // THEN
      expect(onPress).toHaveBeenCalledTimes(1)
    })
  })
})
