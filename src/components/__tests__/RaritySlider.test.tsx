import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { Gesture } from 'react-native-gesture-handler'

import { rarities } from '../../lib/TestUtils'
import RaritySlider from '../RaritySlider'

jest.mock('react-native-gesture-handler', () => {
  const actualModule = jest.requireActual<any>('react-native-gesture-handler')

  // Always return the same mock pan gesture instance so we can call its handlers in tests
  const mockPanGesture = actualModule.Gesture.Pan()
  return {
    ...actualModule,
    Gesture: {
      ...actualModule.Gesture,
      Pan: () => mockPanGesture,
    },
  }
})

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
      Gesture.Pan().handlers.onChange?.({ absoluteX: 300 })
      Gesture.Pan().handlers.onEnd?.({} as any, true)

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
