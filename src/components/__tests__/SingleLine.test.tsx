import React from 'react'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import SingleLine from '../SingleLine'

describe('SingleLine', () => {
  test('Render', () => {
    const { toJSON } = render(<SingleLine>hello world</SingleLine>)
    expect(toJSON()).toMatchSnapshot()
  })
})
