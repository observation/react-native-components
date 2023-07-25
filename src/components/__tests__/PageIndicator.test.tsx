import React from 'react'

import { render } from '@testing-library/react-native'

import PageIndicator from '../PageIndicator'

describe('PageIndicator', () => {
  describe('Rendering', () => {
    test('Page 1/1', () => {
      const { toJSON } = render(<PageIndicator currentPage={1} numberOfPages={1} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 1/4', () => {
      const { toJSON } = render(<PageIndicator currentPage={1} numberOfPages={4} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 2/4', () => {
      const { toJSON } = render(<PageIndicator currentPage={2} numberOfPages={4} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 4/4', () => {
      const { toJSON } = render(<PageIndicator currentPage={4} numberOfPages={4} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 1/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={1} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 2/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={2} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 5/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={5} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 6/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={6} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 7/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={7} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
    test('Page 12/12', () => {
      const { toJSON } = render(<PageIndicator currentPage={12} numberOfPages={12} />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
