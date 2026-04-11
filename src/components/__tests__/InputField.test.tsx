import React from 'react'
import { TextInput } from 'react-native'

import { act, render } from '@testing-library/react-native'

import { Icon } from '../Icon'
import InputField from '../InputField'

class CustomTextInput extends TextInput {}

describe('InputField', () => {
  describe('Rendering', () => {
    test('Normal', () => {
      // GIVEN
      const { toJSON } = render(<InputField />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With focus', async () => {
      // GIVEN
      const { toJSON, getByTestId } = render(<InputField inputProps={{ testID: 'test-id' }} />)

      // WHEN
      act(() => getByTestId('test-id').props.onFocus())

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Without focus', async () => {
      // GIVEN
      const { toJSON, getByTestId } = render(<InputField inputProps={{ testID: 'test-id' }} />)

      // WHEN
      getByTestId('test-id').props.onBlur()

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a label', async () => {
      // GIVEN
      const { toJSON } = render(<InputField label="The label" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a right icon', async () => {
      // GIVEN
      const { toJSON } = render(<InputField rightIcon={<Icon name="info-circle" />} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('Disabled', async () => {
      // GIVEN
      const { toJSON } = render(<InputField label="The label" disabled />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With an error message', async () => {
      // GIVEN
      const { toJSON } = render(<InputField errorMessage={'The error message'} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With focus and an error message', async () => {
      // GIVEN
      const { toJSON, getByTestId } = render(<InputField inputProps={{ testID: 'test-id' }} />)

      // WHEN
      act(() => getByTestId('test-id').props.onFocus())

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a description', () => {
      // GIVEN
      const { toJSON } = render(<InputField description="The description" />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With an alternative TextInput component', () => {
      // GIVEN
      const { toJSON } = render(<InputField description="The description" textInputComponent={CustomTextInput} />)

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
