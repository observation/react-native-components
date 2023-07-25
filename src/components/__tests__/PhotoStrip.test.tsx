import React from 'react'
import { Text } from 'react-native'

import { render, fireEvent } from '@testing-library/react-native'

import PhotoStrip from '../PhotoStrip'

const mockPhotos = new Array(5).fill(undefined).map((_, i) => `https://path.to/image${i}.jpg`)

describe('PhotoStrip', () => {
  describe('Rendering', () => {
    test('Render 3 items', () => {
      const data = mockPhotos.slice(0, 3)
      const { toJSON } = render(<PhotoStrip photos={data} width={400} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Render 5 items', () => {
      const { toJSON } = render(<PhotoStrip photos={mockPhotos} width={400} />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Render species name, date and user in footer', async () => {
      const { toJSON, getAllByTestId } = render(
        <PhotoStrip
          photos={mockPhotos}
          width={400}
          title="The name of the species"
          description="Today"
          content={<Text>Joe User</Text>}
        />,
      )
      await fireEvent.press(getAllByTestId('touchable-opacity')[2])

      expect(toJSON()).toMatchSnapshot()
    })

    test('Click on item to open the lightbox', async () => {
      // GIVEN
      const { getAllByTestId, toJSON } = render(<PhotoStrip photos={mockPhotos} width={400} />)

      // WHEN
      await fireEvent.press(getAllByTestId('touchable-opacity')[2])

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Close the lightbox', async () => {
      // GIVEN
      const { getAllByTestId, getByTestId, queryByTestId } = render(<PhotoStrip photos={mockPhotos} width={400} />)
      await fireEvent.press(getAllByTestId('touchable-opacity')[2])

      // WHEN
      await fireEvent.press(getByTestId('close-lightbox'))

      // THEN
      expect(queryByTestId('close')).toBeNull()
    })
  })
})
