import React from 'react'

import { render } from '@testing-library/react-native'

import Notification from '../Notification'

describe('Notification', () => {
  test('Rendering', () => {
    // WHEN
    const { toJSON } = render(<Notification count={10} style={{ flex: 1 }} />)

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })
})
