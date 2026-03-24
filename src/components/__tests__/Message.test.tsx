import React from 'react'

import { render } from '@testing-library/react-native'

import Message from '../Message'

jest.mock('../../components/LargeButton', () => 'mock-large-button')

describe('Message', () => {
  describe('Rendering', () => {
    test('Without button', () => {
      // GIVEN
      const { toJSON } = render(<Message title="Title" text="Text" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With button', () => {
      // GIVEN
      const { toJSON } = render(
        <Message title="Title" text="Text" buttons={[{ onPress: () => {}, title: 'button title' }]} />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without title', () => {
      // GIVEN
      const { toJSON } = render(<Message text="Text" buttons={[{ onPress: () => {}, title: 'button title' }]} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With style', () => {
      // GIVEN
      const { toJSON } = render(<Message title="Title" text="Text" style={{ margin: 16 }} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
