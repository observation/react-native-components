import React from 'react'

import { render } from '@testing-library/react-native'

import PhotoDetails from '../PhotoDetails'

describe('PhotoDetails', () => {
  describe('Rendering', () => {
    test('Normal', () => {
      const { toJSON } = render(
        <PhotoDetails
          title="Western House Martin"
          label="Life stage"
          value="Adult"
          location="Breskens - Telpost e.o. (ZL)"
          attribution="Corstiaan Beeke"
        />,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('Shows all details', () => {
      const { getByText } = render(
        <PhotoDetails
          title="Western House Martin"
          label="Life stage"
          value="Adult"
          location="Breskens - Telpost e.o. (ZL)"
          attribution="Corstiaan Beeke"
        />,
      )
      expect(getByText('Western House Martin')).toBeTruthy()
      expect(getByText('Life stage')).toBeTruthy()
      expect(getByText('Adult')).toBeTruthy()
      expect(getByText('Breskens - Telpost e.o. (ZL)')).toBeTruthy()
      expect(getByText('Corstiaan Beeke')).toBeTruthy()
    })

    test('With only a title', () => {
      const { toJSON, getByText, UNSAFE_queryAllByProps } = render(<PhotoDetails title="Western House Martin" />)
      expect(getByText('Western House Martin')).toBeTruthy()
      expect(UNSAFE_queryAllByProps({ name: 'map-marker-alt' })).toHaveLength(0)
      expect(UNSAFE_queryAllByProps({ name: 'user' })).toHaveLength(0)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
