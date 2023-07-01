import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import TextLink from '../TextLink'

const onPress = jest.fn()
describe('TextLink', () => {
  test('Rendering enabled', () => {
    const { toJSON } = render(
      <TextLink text="Text to click" onPress={onPress} containerStyle={{ flex: 1 }} textStyle={{ fontSize: 1 }} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering disabled', () => {
    const { toJSON } = render(
      <TextLink text="Text to click" onPress={onPress} containerStyle={{ flex: 1 }} textStyle={{ fontSize: 1 }} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(
      <TextLink text="Text to click" onPress={onPress} containerStyle={{ flex: 1 }} textStyle={{ fontSize: 1 }} />,
    )
    await fireEvent.press(getByText('Text to click'))
    expect(onPress).toBeCalled()
  })
})
