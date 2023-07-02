import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import { getTestI18n } from '../../lib/TestUtils'
import MoreInfo from '../MoreInfo'

const testI18n = getTestI18n()

const onPress = jest.fn()
describe('MoreInfo', () => {
  test('Rendering', () => {
    const { toJSON } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} i18n={testI18n} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} i18n={testI18n} />)
    await fireEvent.press(getByText('About the species'))
    expect(onPress).toBeCalled()
  })
})
