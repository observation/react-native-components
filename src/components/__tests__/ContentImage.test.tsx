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
    test('Without onPress, the image cannot be pressed', () => {
      const { getByTestId } = render(<ContentImage alt="Title" src="https://path.to/image.jpg" />)

      expect(getByTestId('photo')).toBeDisabled()
    })

    test('Pressing the image passes its url, title and description to the press handler', async () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByTestId } = render(
        <ContentImage alt="Title | Text" src="https://path.to/image.jpg" onPress={onPress} />,
      )

      // WHEN
      await fireEvent(getByTestId('photo'), 'press')

      // THEN
      expect(onPress).toHaveBeenCalledWith({ src: 'https://path.to/image.jpg', title: 'Title', description: 'Text' })
    })
  })
})
