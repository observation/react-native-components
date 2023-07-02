import React from 'react'

import { render } from '@testing-library/react-native'

import Pictogram from '../Pictogram'

describe('Pictogram', () => {
  test('Rendering no pets', () => {
    const { toJSON } = render(<Pictogram type="no_pets" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering no potplants', () => {
    const { toJSON } = render(<Pictogram type="no_potplants" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering no selfies', () => {
    const { toJSON } = render(<Pictogram type="no_selfies" />)
    expect(toJSON()).toMatchSnapshot()
  })
})
