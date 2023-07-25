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
const content = <Text>Jan de Vogelaar</Text>

let onClose: () => void

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
  })

  describe('Interaction', () => {
    test('Press close button calls onClose', async () => {
      // GIVEN
      const { getByTestId } = render(<Lightbox photos={photos} index={1} onClose={onClose} />)

      // WHEN
      await fireEvent.press(getByTestId('close-lightbox'))

      // THEN
      expect(onClose).toBeCalled()
    })
  })
})
