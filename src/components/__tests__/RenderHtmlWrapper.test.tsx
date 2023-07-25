import React from 'react'

import { render } from '@testing-library/react-native'

import RenderHtmlWrapper from '../RenderHtmlWrapper'

describe('RenderHtmlWrapper', () => {
  describe('Rendering', () => {
    describe('Custom image renderer', () => {
      test('Normal render', () => {
        const html = `<img src="https://waarneming.nl/image.jpeg" alt="A picture" />`
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Without url', () => {
        const html = `<img alt="A picture" />`
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('Custom ordered list renderer', () => {
      test('Normal renderer', () => {
        const html = '<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Ordered list inside an unorderer list', () => {
        const html =
          '<ul>\n<li>Ein<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>\n</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>'
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Unorderer list inside an ordered list', () => {
        const html =
          '<ol>\n<li>Ein<ul>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>\n</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('Custom unordered list', () => {
      test('Normal render', () => {
        const html = '<ul>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>'
        const { toJSON } = render(<RenderHtmlWrapper source={{ html }} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })
  })
})
