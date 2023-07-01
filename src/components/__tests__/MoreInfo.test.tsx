import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import I18n from '../../lib/I18n'
import MoreInfo from '../MoreInfo'

const onPress = jest.fn()
const i18n = new I18n(
  { en: { 'About the species': 'About the species' }, nl: {}, fr: {}, de: {}, es: {} },
  { setLanguage: () => {} },
)
describe('MoreInfo', () => {
  test('Rendering', () => {
    const { toJSON } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} i18n={i18n} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByText } = render(<MoreInfo onPress={onPress} containerStyle={{ flex: 1 }} i18n={i18n} />)
    await fireEvent.press(getByText('About the species'))
    expect(onPress).toBeCalled()
  })
})
