import React from 'react'

import { render } from '@testing-library/react-native'

import BackgroundImage from '../src/components/BackgroundImage'

const pets = require('./assets/pets.svg')

describe('BackgroundImage', () => {
  describe('Rendering', () => {
    test('Required props', () => {
      // WHEN
      const { toJSON } = render(<BackgroundImage source={pets} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('All props', () => {
      // WHEN
      const { toJSON } = render(
        <BackgroundImage
          source={pets}
          style={{ flex: 1 }}
          top={1}
          bottom={2}
          left={3}
          right={4}
          width={1000}
          height={750}
        />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
