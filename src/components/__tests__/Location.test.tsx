import React from 'react'

import { render } from '@testing-library/react-native'

import Location from '../Location'

describe('Location', () => {
  test('Rendering', () => {
    const { toJSON } = render(
      <Location location="Voorschoten - algemeen (Zuid-Holland)" containerStyle={{ flex: 1 }} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
