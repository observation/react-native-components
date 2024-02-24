import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import WebLink from '../WebLink'

const onPress = jest.fn()
describe('WebLink', () => {
  test('Rendering', () => {
    const { toJSON } = render(<WebLink onPress={onPress} containerStyle={{ flex: 1 }} text="View on website" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(<WebLink onPress={onPress} containerStyle={{ flex: 1 }} text="View on website" />)
    await fireEvent.press(getByText('View on website'))
    expect(onPress).toBeCalled()
  })
})
