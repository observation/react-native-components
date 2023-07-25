import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import MoreInfo from '../MoreInfo'

const onPress = jest.fn()
describe('MoreInfo', () => {
  test('Rendering', () => {
    const { toJSON } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} label="About the species" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, different translation', () => {
    const { toJSON } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} label="Over de soort" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} label="About the species" />)
    await fireEvent.press(getByText('About the species'))
    expect(onPress).toBeCalled()
  })
})
