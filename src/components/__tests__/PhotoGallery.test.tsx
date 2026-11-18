import React from 'react'
import { Text } from 'react-native'

import { act, fireEvent, render } from '@testing-library/react-native'

import PhotoGallery from '../PhotoGallery'

let onIndexChange: (index: number) => void
const mockSetIndex = jest.fn()
jest.mock('react-native-zoom-toolkit', () => {
  const ActualReact = jest.requireActual<typeof React>('react')
  const ActualZoomToolkit = jest.requireActual<any>('react-native-zoom-toolkit')
  return {
    ...ActualZoomToolkit,
    Gallery: ({ ref, ...props }: any) => {
      ;({ onIndexChange } = props)
      ActualReact.useImperativeHandle(ref, () => ({ setIndex: mockSetIndex }))
      return <ActualZoomToolkit.Gallery {...props} />
    },
  }
})

const photos = ['https://path.to/image0.jpg', 'https://path.to/image1.jpg', 'https://path.to/image2.jpg']

describe('PhotoGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('Normal', () => {
      const { queryByTestId, toJSON } = render(
        <PhotoGallery photos={photos} currentIndex={0} onIndexChange={jest.fn()} onClose={jest.fn()} />,
      )
      expect(queryByTestId('delete-photo')).toBeNull()
      expect(queryByTestId('crop-photo')).toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With footer for the current photo', () => {
      const { getByText, toJSON } = render(
        <PhotoGallery
          photos={photos}
          currentIndex={1}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          renderFooter={(index) => <Text>Footer of photo {index}</Text>}
        />,
      )
      expect(getByText('Footer of photo 1')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With delete and crop buttons', () => {
      const { getByTestId, toJSON } = render(
        <PhotoGallery
          photos={photos}
          currentIndex={0}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          onDelete={jest.fn()}
          onCrop={jest.fn()}
        />,
      )
      expect(getByTestId('delete-photo')).toBeTruthy()
      expect(getByTestId('crop-photo')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With only a delete button', () => {
      const { getByTestId, queryByTestId } = render(
        <PhotoGallery
          photos={photos}
          currentIndex={0}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          onDelete={jest.fn()}
        />,
      )
      expect(getByTestId('delete-photo')).toBeTruthy()
      expect(queryByTestId('crop-photo')).toBeNull()
    })

    test('With current index out of bounds', () => {
      const { toJSON } = render(
        <PhotoGallery photos={photos} currentIndex={3} onIndexChange={jest.fn()} onClose={jest.fn()} />,
      )
      expect(toJSON()).toBeNull()
    })
  })

  describe('Interaction', () => {
    test('Pressing the close button calls onClose', () => {
      // GIVEN
      const onClose = jest.fn()
      const { getByTestId } = render(
        <PhotoGallery photos={photos} currentIndex={0} onIndexChange={jest.fn()} onClose={onClose} />,
      )

      // WHEN
      fireEvent.press(getByTestId('close'))

      // THEN
      expect(onClose).toHaveBeenCalled()
    })

    test('Swiping to another photo calls onIndexChange', () => {
      // GIVEN
      const onIndexChangeMock = jest.fn()
      render(<PhotoGallery photos={photos} currentIndex={0} onIndexChange={onIndexChangeMock} onClose={jest.fn()} />)

      // WHEN
      act(() => onIndexChange(2))

      // THEN
      expect(onIndexChangeMock).toHaveBeenCalledWith(2)
      expect(mockSetIndex).not.toHaveBeenCalled()
    })

    test('The gallery reporting the current index does not call onIndexChange', () => {
      // GIVEN
      const onIndexChangeMock = jest.fn()
      render(<PhotoGallery photos={photos} currentIndex={1} onIndexChange={onIndexChangeMock} onClose={jest.fn()} />)

      // WHEN
      act(() => onIndexChange(1))

      // THEN
      expect(onIndexChangeMock).not.toHaveBeenCalled()
    })

    test('The footer shows the current index of the parent', () => {
      // GIVEN
      const renderFooter = (index: number) => <Text>Footer of photo {index}</Text>
      const { getByText, rerender } = render(
        <PhotoGallery
          photos={photos}
          currentIndex={0}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          renderFooter={renderFooter}
        />,
      )

      // WHEN
      act(() => onIndexChange(2))
      rerender(
        <PhotoGallery
          photos={photos}
          currentIndex={2}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          renderFooter={renderFooter}
        />,
      )

      // THEN
      expect(getByText('Footer of photo 2')).toBeTruthy()
    })

    test('After a swipe the gallery is not scrolled again', () => {
      // GIVEN
      const { rerender } = render(
        <PhotoGallery photos={photos} currentIndex={0} onIndexChange={jest.fn()} onClose={jest.fn()} />,
      )

      // WHEN
      act(() => onIndexChange(2))
      rerender(<PhotoGallery photos={photos} currentIndex={2} onIndexChange={jest.fn()} onClose={jest.fn()} />)

      // THEN
      expect(mockSetIndex).not.toHaveBeenCalled()
    })

    test('Changing the current index from outside scrolls the gallery to that photo', () => {
      // GIVEN
      const { rerender } = render(
        <PhotoGallery photos={photos} currentIndex={0} onIndexChange={jest.fn()} onClose={jest.fn()} />,
      )

      // WHEN
      rerender(<PhotoGallery photos={photos} currentIndex={2} onIndexChange={jest.fn()} onClose={jest.fn()} />)

      // THEN
      expect(mockSetIndex).toHaveBeenCalledWith(2)
    })

    test('Pressing the delete button calls onDelete with the current index', () => {
      // GIVEN
      const onDelete = jest.fn()
      const { getByTestId } = render(
        <PhotoGallery
          photos={photos}
          currentIndex={1}
          onIndexChange={jest.fn()}
          onClose={jest.fn()}
          onDelete={onDelete}
        />,
      )

      // WHEN
      fireEvent.press(getByTestId('delete-photo'))

      // THEN
      expect(onDelete).toHaveBeenCalledWith(1)
    })

    test('Pressing the crop button calls onCrop with the current index', () => {
      // GIVEN
      const onCrop = jest.fn()
      const { getByTestId } = render(
        <PhotoGallery photos={photos} currentIndex={2} onIndexChange={jest.fn()} onClose={jest.fn()} onCrop={onCrop} />,
      )

      // WHEN
      fireEvent.press(getByTestId('crop-photo'))

      // THEN
      expect(onCrop).toHaveBeenCalledWith(2)
    })
  })
})
