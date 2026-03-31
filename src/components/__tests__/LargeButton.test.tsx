import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import { defaultTheme } from '../../theme/defaultTheme'
import LargeButton from '../LargeButton'

const onPress = jest.fn()
const onPressIn = jest.fn()

const theme = defaultTheme

describe('LargeButton', () => {
  test('Rendering, enabled, primary', () => {
    const { toJSON } = render(<LargeButton title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, enabled, secondary', () => {
    const { toJSON } = render(<LargeButton secondary title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, disabled, primary', () => {
    const { toJSON } = render(<LargeButton disabled title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, disabled, secondary', () => {
    const { toJSON } = render(<LargeButton disabled secondary title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, primary, danger', () => {
    const { toJSON } = render(<LargeButton danger title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, secondary, danger', () => {
    const { toJSON } = render(<LargeButton secondary danger title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, secondary, danger, disabled => defaults to primary', () => {
    const { toJSON } = render(
      <LargeButton secondary disabled danger title="Press me" onPress={onPress} style={{ flex: 1 }} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, with icon', () => {
    const { toJSON } = render(
      <LargeButton iconName="info-circle" title="Press me" onPress={onPress} style={{ flex: 1 }} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Rendering, with title style', () => {
    const { toJSON } = render(
      <LargeButton
        iconName="info-circle"
        title="Press me"
        titleStyle={theme.text.subtitle}
        onPress={onPress}
        style={{ flex: 1 }}
      />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  test('Click', async () => {
    const { getByTestId } = render(<LargeButton title="Press me" onPress={onPress} style={{ flex: 1 }} />)
    await fireEvent.press(getByTestId('touchable-opacity'))
    expect(onPress).toHaveBeenCalled()
  })

  test('onPressIn', async () => {
    const { getByTestId } = render(
      <LargeButton title="Press me" onPress={onPress} onPressIn={onPressIn} style={{ flex: 1 }} />,
    )
    await fireEvent(getByTestId('touchable-opacity'), 'pressIn')
    expect(onPressIn).toHaveBeenCalled()
  })
})
