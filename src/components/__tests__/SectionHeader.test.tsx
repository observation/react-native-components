import React from 'react'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import SectionHeader from '../SectionHeader'

describe('SectionHeader', () => {
  describe('Rendering', () => {
    test('Normal', () => {
      // WHEN
      const { toJSON } = render(<SectionHeader title={'Header title'} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With container style', () => {
      // WHEN
      const { toJSON } = render(<SectionHeader containerStyle={{ margin: 0 }} title={'Header title'} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
