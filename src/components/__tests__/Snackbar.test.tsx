import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import { SnackbarMessage } from '../../stores/SnackbarMessage'
import Snackbar from '../Snackbar'

const createMessage = ({ text = 'Something happened', closable = true, action }: Partial<SnackbarMessage> = {}) =>
  new SnackbarMessage({ text, closable, action })

describe('Snackbar', () => {
  describe('Rendering', () => {
    test('The message text is rendered', () => {
      // GIVEN
      const { getByText, toJSON } = render(
        <Snackbar message={createMessage({ text: 'Hello there' })} bottomOffset={0} onDismiss={jest.fn()} />,
      )

      // THEN
      expect(getByText('Hello there')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('A close button is shown for a closable message', () => {
      // GIVEN
      const { getByTestId } = render(
        <Snackbar message={createMessage({ closable: true })} bottomOffset={0} onDismiss={jest.fn()} />,
      )

      // THEN
      expect(getByTestId('close-button')).toBeTruthy()
    })

    test('No close button is shown for an auto-dismissible message', () => {
      // GIVEN
      const { queryByTestId } = render(
        <Snackbar message={createMessage({ closable: false })} bottomOffset={0} onDismiss={jest.fn()} />,
      )

      // THEN
      expect(queryByTestId('close-button')).toBeNull()
    })

    test('An action button and a close button are shown when the message has an action', () => {
      // GIVEN
      const { getByText, getByTestId, toJSON } = render(
        <Snackbar
          message={createMessage({ closable: false, action: { text: 'Undo', onPress: jest.fn() } })}
          bottomOffset={0}
          onDismiss={jest.fn()}
        />,
      )

      // THEN
      expect(getByText('Undo')).toBeTruthy()
      expect(getByTestId('close-button')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Pressing the close button calls onDismiss', () => {
      // GIVEN
      const onDismiss = jest.fn()
      const { getByTestId } = render(<Snackbar message={createMessage()} bottomOffset={0} onDismiss={onDismiss} />)

      // WHEN
      fireEvent.press(getByTestId('close-button'))

      // THEN
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    test('Pressing the action button calls onDismiss and the message handler', () => {
      // GIVEN
      const onDismiss = jest.fn()
      const handler = jest.fn()
      const { getByText } = render(
        <Snackbar
          message={createMessage({ closable: false, action: { text: 'Undo', onPress: handler } })}
          bottomOffset={0}
          onDismiss={onDismiss}
        />,
      )

      // WHEN
      fireEvent.press(getByText('Undo'))

      // THEN
      expect(onDismiss).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
