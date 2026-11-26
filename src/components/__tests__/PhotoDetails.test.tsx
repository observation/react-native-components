import React from 'react'

import { render } from '@testing-library/react-native'

import PhotoDetails from '../PhotoDetails'

describe('PhotoDetails', () => {
  describe('Rendering', () => {
    test('With all details', () => {
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

    test('With only a title', () => {
      const { toJSON } = render(<PhotoDetails title="Western House Martin" />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
