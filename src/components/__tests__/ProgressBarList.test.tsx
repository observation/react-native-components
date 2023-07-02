import React from 'react'

import { render } from '@testing-library/react-native'

import ProgressBar from '../../data/ProgressBar'
import ProgressBarList from '../ProgressBarList'

describe('ProgressBarList', () => {
  test('Show bars', () => {
    // GIVEN
    const bars = [
      new ProgressBar('Label', 0, 6, 'red'),
      new ProgressBar('Label', 1, 6, 'orange'),
      new ProgressBar('Label', 2, 6, 'yellow'),
      new ProgressBar('Label', 3, 6, 'green'),
      new ProgressBar('Label', 4, 6, 'blue'),
      new ProgressBar('Label', 5, 6, 'indigo'),
      new ProgressBar('Label', 6, 6, 'violet'),
    ]

    // THEN
    const { toJSON } = render(<ProgressBarList progressBars={bars} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Border radius is 0 with % < 50', () => {
    // GIVEN
    const bars = [new ProgressBar('Label', 0, 6, 'red')]

    // THEN
    const { getByTestId } = render(<ProgressBarList progressBars={bars} />)

    const growingBar = getByTestId('growing-bar')
    expect(growingBar.props.style.borderTopRightRadius).toBe(0)
    expect(growingBar.props.style.borderBottomRightRadius).toBe(0)
  })

  test('Border radius is normal with % > 50', () => {
    // GIVEN
    const bars = [new ProgressBar('Label', 60, 6, 'red')]

    // THEN
    const { getByTestId } = render(<ProgressBarList progressBars={bars} />)

    const growingBar = getByTestId('growing-bar')
    expect(growingBar.props.style.borderTopRightRadius).toBe(8)
    expect(growingBar.props.style.borderBottomRightRadius).toBe(8)
  })
})
