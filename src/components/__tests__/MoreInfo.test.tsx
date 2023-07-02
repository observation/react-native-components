import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import MoreInfo from '../MoreInfo'

const onPress = jest.fn()
describe('MoreInfo', () => {
  test('Rendering', () => {
    const { toJSON } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} />)
    await fireEvent.press(getByText('About the species'))
    expect(onPress).toBeCalled()
  })
})
