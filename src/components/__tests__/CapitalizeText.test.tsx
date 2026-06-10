import React from 'react'
import { Text } from 'react-native'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import CapitalizeText from '../CapitalizeText'

describe('CapitalizeText', () => {
  test('Capitalizes the text', () => {
    const { queryByText } = render(<CapitalizeText>hello world</CapitalizeText>)
    expect(queryByText('Hello world')).toBeTruthy()
  })

  test('With multiple children, the first one being a string, the text is capitalized', () => {
    const { queryByText } = render(
      <CapitalizeText>
        hello <Text>world</Text>
      </CapitalizeText>,
    )
    expect(queryByText('Hello world')).toBeTruthy()
  })

  test('When the first child is not a string, no text is capitalized', () => {
    const { queryByText } = render(
      <CapitalizeText>
        <Text>hello</Text> world
      </CapitalizeText>,
    )
    expect(queryByText('hello world')).toBeTruthy()
  })
})
