import React from 'react'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import HtmlContent from '../HtmlContent'

describe('HtmlContent', () => {
  describe('Rendering', () => {
    describe('Custom image renderer', () => {
      test('Normal render', () => {
        const html = `<img src="https://waarneming.nl/image.jpeg" alt="A picture" />`
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Without url', () => {
        const html = `<img alt="A picture" />`
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('Override renderer', () => {
      test('Override ol', () => {
        const html = '<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const renderers = { ol: () => <></> }
        const { toJSON, queryByText } = render(<HtmlContent html={html} renderers={renderers} />)
        expect(queryByText('Ein')).toBeFalsy()
        expect(toJSON()).toMatchSnapshot()
      })

      test('Override ul does not affect ol', () => {
        const html = '<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const renderers = { ul: () => <></> }
        const { toJSON, queryByText } = render(<HtmlContent html={html} renderers={renderers} />)
        expect(queryByText('Ein')).toBeTruthy()
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('Custom ordered list renderer', () => {
      test('Normal renderer', () => {
        const html = '<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Ordered list inside an unordered list', () => {
        const html =
          '<ul>\n<li>Ein<ol>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>\n</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>'
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })

      test('Unordered list inside an ordered list', () => {
        const html =
          '<ol>\n<li>Ein<ul>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>\n</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ol>'
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })

    describe('Custom unordered list', () => {
      test('Normal render', () => {
        const html = '<ul>\n<li>Ein</li>\n<li>Zwei</li>\n<li>Drei</li>\n</ul>'
        const { toJSON } = render(<HtmlContent html={html} />)
        expect(toJSON()).toMatchSnapshot()
      })
    })
  })
})
