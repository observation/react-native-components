import React from 'react'

import { render } from '@testing-library/react-native'

import { BrandIcon } from '../BrandIcon'

describe('BrandIcon', () => {
  describe('Rendering', () => {
    test('Normal', () => {
      const { toJSON } = render(<BrandIcon name="wikipedia-w" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('With color', () => {
      const { toJSON } = render(<BrandIcon name="wikipedia-w" color={'red'} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('With size', () => {
      const { toJSON } = render(<BrandIcon name="wikipedia-w" size={20} />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
