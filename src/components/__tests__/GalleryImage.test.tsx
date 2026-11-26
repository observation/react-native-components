import React from 'react'

import { act, render } from '@testing-library/react-native'

import GalleryImage from '../GalleryImage'

describe('GalleryImage', () => {
  describe('Rendering', () => {
    test('Normal', () => {
      const { toJSON } = render(<GalleryImage uri="file://path/to/photo1.jpg" />)
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interactions', () => {
    test('onLoad sizes the image to fit the window, keeping its aspect ratio', () => {
      // GIVEN
      const { getByTestId } = render(<GalleryImage uri="file://path/to/photo1.jpg" />)
      let image = getByTestId('image-gallery-image')
      expect(image.props.style).toEqual({ width: 750, height: 750 })

      // WHEN
      act(() => image.props.onLoad({ nativeEvent: { source: { width: 800, height: 600 } } }))

      // THEN
      image = getByTestId('image-gallery-image')
      expect(image.props.style).toEqual({ width: 750, height: 562.5 })
    })
  })
})
