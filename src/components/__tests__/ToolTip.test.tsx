import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import Tooltip from '../Tooltip'

const onCloseTooltip = jest.fn()

describe('Tooltip', () => {
  describe('Rendering', () => {
    test('With icon', () => {
      // GIVEN
      const { toJSON } = render(<Tooltip icon={{ name: 'info-circle' }} title="Title" text="Text" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without icon', () => {
      // GIVEN
      const { toJSON } = render(<Tooltip title="Title" text="Text" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without icon or close button', () => {
      // GIVEN
      const { toJSON } = render(<Tooltip title="Title" text="Text" closable={false} />)
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With button', () => {
      // GIVEN
      const { toJSON } = render(
        <Tooltip title="Title" text="Text" closable={false} buttons={[{ onPress: () => {}, title: 'button title' }]} />,
      )
      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click on close', () => {
      // GIVEN
      const { getByTestId } = render(
        <Tooltip title="Title" text="Text" onClose={onCloseTooltip} icon={{ name: 'info-circle' }} />,
      )
      // WHEN
      fireEvent.press(getByTestId('close'))

      // THEN
      expect(onCloseTooltip).toBeCalled()
    })

    test('Click on a button', () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByText } = render(
        <Tooltip title="Title" text="Text" buttons={[{ onPress, title: 'Action!' }]} icon={{ name: 'info-circle' }} />,
      )

      // WHEN
      fireEvent.press(getByText('Action!'))

      // THEN
      expect(onPress).toBeCalled()
    })
  })
})
