import React from 'react'

import { render } from '@testing-library/react-native'

import Date from '../Date'

describe('Date', () => {
  test('Rendering', () => {
    const { toJSON } = render(<Date date="4-10-2019 9:10" containerStyle={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
