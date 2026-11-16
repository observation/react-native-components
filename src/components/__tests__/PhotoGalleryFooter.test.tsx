import React from 'react'
import { Text } from 'react-native'

import { render } from '@testing-library/react-native'

import PhotoGalleryFooter from '../PhotoGalleryFooter'

describe('PhotoGalleryFooter', () => {
  describe('Rendering', () => {
    test('With title, description and content', () => {
      const { getByText, toJSON } = render(
        <PhotoGalleryFooter title="Blackbird" description="Today">
          <Text>Joe User</Text>
        </PhotoGalleryFooter>,
      )
      expect(getByText('Blackbird')).toBeTruthy()
      expect(getByText('Today')).toBeTruthy()
      expect(getByText('Joe User')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without title, description and content', () => {
      const { toJSON } = render(<PhotoGalleryFooter />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
