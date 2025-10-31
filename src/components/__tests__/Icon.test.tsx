import React from 'react'

import { render } from '@testing-library/react-native'

import { Icon } from '../Icon'

describe('Icon', () => {
  test('Light icon', () => {
    const { toJSON } = render(<Icon name="info-circle" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Solid icon', () => {
    const { toJSON } = render(<Icon name="info-circle" style="solid" />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('With color and size', () => {
    const { toJSON } = render(<Icon name="info-circle" color="#ff0000" size={32} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('With rotation', () => {
    const { toJSON } = render(<Icon name="info-circle" rotation={90} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
