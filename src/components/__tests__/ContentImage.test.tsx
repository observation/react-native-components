import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import ContentImage from '../ContentImage'

jest.mock('react-native-scalable-image', () => 'mock-scalable-image')

describe('ContentImage', () => {
  describe('Rendering', () => {
    test('With alt title and text', () => {
      const { toJSON } = render(<ContentImage alt="Title | Text" src="https://path.to/image.jpg" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('With alt title', () => {
      const { toJSON } = render(<ContentImage alt="Title" src="https://path.to/image.jpg" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('With alt title ending in delimiter', () => {
      const { toJSON } = render(<ContentImage alt="Title|" src="https://path.to/image.jpg" />)
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without alt title', () => {
      const { toJSON } = render(<ContentImage src="https://path.to/image.jpg" />)
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click the image to show the lightbox', async () => {
      const { toJSON, getByTestId } = render(<ContentImage alt="Title" src="https://path.to/image.jpg" />)
      await fireEvent(getByTestId('photo'), 'press')

      expect(toJSON()).toMatchSnapshot()
    })

    test('Close the lightbox', async () => {
      const { toJSON, getByTestId } = render(<ContentImage alt="Title" src="https://path.to/image.jpg" />)
      await fireEvent(getByTestId('photo'), 'press')
      await fireEvent(getByTestId('close-lightbox'), 'press')
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
