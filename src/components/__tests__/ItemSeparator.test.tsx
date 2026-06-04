import React from 'react'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import { margin } from '../../theme/tokens/margin'
import ItemSeparator from '../ItemSeparator'

describe('ItemSeparator', () => {
  test('Rendering default separator', () => {
    // WHEN
    const { toJSON } = render(<ItemSeparator />)

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering vertical separator', () => {
    // WHEN
    const { toJSON } = render(<ItemSeparator orientation="vertical" />)

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering with custom style separator', () => {
    // WHEN
    const { toJSON } = render(<ItemSeparator style={{ marginLeft: margin.common }} />)

    // THEN
    expect(toJSON()).toMatchSnapshot()
  })
})
