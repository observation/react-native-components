import React from 'react'

import { render } from '@testing-library/react-native'

import PercentageCircle from '../PercentageCircle'

describe('PercentageCircle', () => {
  describe('Rendering', () => {
    test('0%', () => {
      const { toJSON } = render(<PercentageCircle percentage={0} color="red" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('42%', () => {
      const { toJSON } = render(<PercentageCircle percentage={42} color="orange" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('100%', () => {
      const { toJSON } = render(<PercentageCircle percentage={100} color="green" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Custom size and thickness', () => {
      const { toJSON } = render(<PercentageCircle percentage={75} color="green" size={64} thickness={8} />)
      expect(toJSON()).toMatchSnapshot()
    })
  })

  test('Shows the percentage', () => {
    // GIVEN
    const { getByText } = render(<PercentageCircle percentage={42} color="orange" />)

    // THEN
    expect(getByText('42%')).toBeTruthy()
  })
})
