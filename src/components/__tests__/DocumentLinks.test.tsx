import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import DocumentLink from '../DocumentLink'

const onPress = jest.fn()
describe('DocumentLink', () => {
  test('Rendering', () => {
    const { toJSON } = render(<DocumentLink onPress={onPress} containerStyle={{ flex: 1 }} label="Privacy statement" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(
      <DocumentLink onPress={onPress} containerStyle={{ flex: 1 }} label="Privacy statement" />,
    )
    await fireEvent.press(getByText('Privacy statement'))
    expect(onPress).toBeCalled()
  })
})
