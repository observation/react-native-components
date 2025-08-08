import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import ContentImage from '../ContentImage'

jest.mock('react-native-scalable-image', () => 'mock-scalable-image')

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: {
    left: 0,
    top: 59,
    right: 0,
    bottom: 34,
  },
}

describe('ContentImage', () => {
  describe('Rendering', () => {
    test('With alt title and text', () => {
      const { toJSON } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title | Text" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('With alt title', () => {
      const { toJSON } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('With alt title ending in delimiter', () => {
      const { toJSON } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title|" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without alt title', () => {
      const { toJSON } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click the image to show the lightbox', async () => {
      const { toJSON, getByTestId } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      await fireEvent(getByTestId('photo'), 'press')

      expect(toJSON()).toMatchSnapshot()
    })

    test('Close the lightbox', async () => {
      const { toJSON, getByTestId } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      await fireEvent(getByTestId('photo'), 'press')

      expect(toJSON()).toMatchSnapshot()
    })

    test('Close the lightbox', async () => {
      const { toJSON, getByTestId } = render(
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ContentImage alt="Title" src="https://path.to/image.jpg" />
        </SafeAreaProvider>,
      )
      await fireEvent(getByTestId('photo'), 'press')
      await fireEvent(getByTestId('close-lightbox'), 'press')
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
