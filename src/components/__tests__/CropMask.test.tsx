import React from 'react'

import { render } from '@testing-library/react-native'

import CropMask from '../CropMask'

describe('CropMask', () => {
  describe('Rendering', () => {
    test('Rectangle', () => {
      const { toJSON } = render(
        <CropMask outerRectangle={{ width: 400, height: 600 }} innerRectangle={{ width: 300, height: 200 }} />,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('Circle', () => {
      const { toJSON } = render(
        <CropMask
          outerRectangle={{ width: 400, height: 600 }}
          innerRectangle={{ width: 300, height: 300 }}
          shape="circle"
        />,
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
