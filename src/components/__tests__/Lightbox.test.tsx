import React from 'react'
import { Text } from 'react-native'

import { fireEvent, render } from '@testing-library/react-native'

import Lightbox from '../Lightbox'

const photos = [
  'https://waarneming-test.nl/media/photo/031/772/31772398.jpg',
  'https://waarneming-test.nl/media/photo/031/772/31772399.jpg',
]
const title = 'Grey Wagtail'
const description = '11/26/2020 2:37 PM'
const content = () => <Text>Jan de Vogelaar</Text>

let onClose: () => void

let mockOnImageIndexChange = jest.fn()
jest.mock('@observation.org/react-native-image-viewing', () => {
  const actualModule = jest.requireActual('@observation.org/react-native-image-viewing')
  return (props: any) => {
    mockOnImageIndexChange = props.onImageIndexChange as any
    return actualModule.default(props)
  }
})

describe('Lightbox', () => {
  beforeEach(() => {
    onClose = jest.fn()
  })

  describe('Rendering', () => {
    test('First photo', () => {
      const { toJSON, queryByText } = render(
        <Lightbox photos={photos} title={title} description={description} index={0} onClose={onClose} />,
      )
      expect(queryByText('Grey Wagtail')).not.toBeNull()
      expect(queryByText('11/26/2020 2:37 PM')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Second photo', () => {
      const { toJSON, queryByText } = render(
        <Lightbox photos={photos} title={title} description={description} index={1} onClose={onClose} />,
      )
      expect(queryByText('Grey Wagtail')).not.toBeNull()
      expect(queryByText('11/26/2020 2:37 PM')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('Only a photo', () => {
      const { toJSON } = render(<Lightbox photos={photos} index={0} onClose={onClose} />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('Photo with species name, date and user', () => {
      const { toJSON } = render(
        <Lightbox
          photos={photos}
          title={title}
          description={description}
          content={content}
          index={0}
          onClose={onClose}
        />,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('Content that is dependent on the selected image', () => {
      const imageIndexDependentContent = (imageIndex?: number) => <Text>Karel de {imageIndex}e</Text>
      const { toJSON, queryByText } = render(
        <Lightbox
          photos={photos}
          title={title}
          description={description}
          content={imageIndexDependentContent}
          index={99}
          onClose={onClose}
        />,
      )

      expect(queryByText('Karel de 99e')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a delete button', () => {
      const { toJSON, queryByTestId } = render(
        <Lightbox photos={photos} index={0} onClose={onClose} onDelete={() => {}} />,
      )

      expect(queryByTestId('delete-photo')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a crop button', () => {
      const { toJSON, queryByTestId } = render(
        <Lightbox photos={photos} index={0} onClose={onClose} onCrop={() => {}} />,
      )

      expect(queryByTestId('crop-photo')).not.toBeNull()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Press close button calls onClose', async () => {
      // GIVEN
      const { getByTestId } = render(<Lightbox photos={photos} index={1} onClose={onClose} />)

      // WHEN
      await fireEvent.press(getByTestId('close-lightbox'))

      // THEN
      expect(onClose).toHaveBeenCalled()
    })

    test('Press delete button calls onDelete', async () => {
      // GIVEN
      const onDelete = jest.fn()
      const { getByTestId } = render(<Lightbox photos={photos} index={0} onClose={onClose} onDelete={onDelete} />)

      // WHEN
      await fireEvent.press(getByTestId('delete-photo'))

      // THEN
      expect(onDelete).toHaveBeenCalledWith(0)
    })

    test('Press crop button calls onCrop', async () => {
      // GIVEN
      const onCrop = jest.fn()
      const { getByTestId } = render(<Lightbox photos={photos} index={0} onClose={onClose} onCrop={onCrop} />)

      // WHEN
      await fireEvent.press(getByTestId('crop-photo'))

      // THEN
      expect(onCrop).toHaveBeenCalledWith(0)
    })

    test('When swiping to the second photo and pressing the delete button, onDelete is called with the second photo', async () => {
      // GIVEN
      jest.mock('@observation.org/react-native-image-viewing', () => 'ImageCarousel')

      const onDelete = jest.fn()
      const { getByTestId } = render(<Lightbox photos={photos} index={0} onClose={onClose} onDelete={onDelete} />)

      // WHEN
      mockOnImageIndexChange(1)
      await fireEvent.press(getByTestId('delete-photo'))

      // THEN
      expect(onDelete).toHaveBeenCalledWith(1)
    })
  })
})
