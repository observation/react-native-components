import React from 'react'
import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import Panel from '../Panel'

describe('Panel', () => {
  test('Rendering', () => {
    const { toJSON } = render(
      <Panel>
        <Text>Some text</Text>
      </Panel>,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering without top shadow', () => {
    const { toJSON } = render(
      <Panel topShadow={false}>
        <Text>Some text</Text>
      </Panel>,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
