import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { createGestureController, getByGestureTestId } from 'react-native-gesture-handler/jest-utils'

import { rarities } from '../../lib/TestUtils'
import RaritySlider from '../RaritySlider'

describe('RaritySlider', () => {
  const onChange = jest.fn()
  const [, common] = rarities

  describe('Rendering', () => {
    test('Normal', () => {
      const { toJSON } = render(<RaritySlider onChange={onChange} rarities={rarities} value={common} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('No value is translated to common', () => {
      const { queryByText, toJSON } = render(<RaritySlider onChange={onChange} rarities={rarities} value={undefined} />)
      expect(queryByText('Common')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interactions', () => {
    test('When a rarity is pressed, onChange is called with the correct rarity', () => {
      // GIVEN
      const { getByText } = render(<RaritySlider onChange={onChange} rarities={rarities} value={common} />)

      // WHEN
      fireEvent.press(getByText('Very rare'))

      // THEN
      expect(onChange).toHaveBeenCalledWith({
        id: 4,
        name: 'very rare',
      })
    })

    test('When the slider is dragged, onChange is called with the correct rarity', async () => {
      // GIVEN
      render(<RaritySlider onChange={onChange} rarities={rarities} value={common} />)

      // WHEN
      const pan = createGestureController(getByGestureTestId('raritySliderPan'))
      pan.begin()
      pan.activate()
      pan.update({ absoluteX: 300 })
      pan.end()

      // THEN
      await waitFor(() =>
        expect(onChange).toHaveBeenCalledWith({
          id: 3,
          name: 'rare',
        }),
      )
    })
  })
})
