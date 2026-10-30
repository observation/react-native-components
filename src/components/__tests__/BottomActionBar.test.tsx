import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { NavigationContext } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'

import SnackbarReporterContext, { SnackbarReporter } from '../../lib/SnackbarReporterContext'
import { mockNavigationContext } from '../../lib/TestUtils'
import { ThemeProvider, createTheme, defaultTheme } from '../../theme'
import BottomActionBar from '../BottomActionBar'

describe('BottomActionBar', () => {
  describe('Rendering', () => {
    test('With title and text', () => {
      const { toJSON } = render(<BottomActionBar title="Title" text="Text" />)

      expect(toJSON()).toMatchSnapshot()
    })

    test('With title, text and button', () => {
      const { toJSON } = render(
        <BottomActionBar title="Title" text="Text" buttons={[{ onPress: () => {}, title: 'Action!' }]} />,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('Only buttons', () => {
      const { toJSON } = render(
        <BottomActionBar
          buttons={[
            { onPress: () => {}, title: 'Cancel', secondary: true },
            { onPress: () => {}, title: 'Save', iconName: 'check', disabled: true },
          ]}
        />,
      )

      expect(toJSON()).toMatchSnapshot()
    })

    test('With children', () => {
      const { queryByText, toJSON } = render(
        <BottomActionBar>
          <Text>Hello world!</Text>
        </BottomActionBar>,
      )

      expect(queryByText('Hello world!')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Styling', () => {
    test('Default theme: screen surface with a shadow', () => {
      // GIVEN
      const { getByTestId } = render(<BottomActionBar testID="bar" />)

      // THEN
      expect(StyleSheet.flatten(getByTestId('bar').props.style)).toEqual(
        expect.objectContaining({
          backgroundColor: defaultTheme.color.background.system.surfaceBase,
          borderTopColor: defaultTheme.color.border.system.base,
          ...defaultTheme.shadow.normal.ios,
        }),
      )
    })

    test('Theme with overridden surface and elevation', () => {
      // GIVEN
      const theme = createTheme({ surface: { screen: 'surfaceRaised' }, elevation: { raised: 'none' } })
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <BottomActionBar testID="bar" />
        </ThemeProvider>,
      )

      // THEN
      const style = StyleSheet.flatten(getByTestId('bar').props.style)
      expect(style.backgroundColor).toBe(theme.color.background.system.surfaceRaised)
      expect(style.shadowColor).toBeUndefined()
      expect(style.shadowOpacity).toBeUndefined()
    })

    test('The style prop overrides the default style', () => {
      // GIVEN
      const { getByTestId } = render(<BottomActionBar testID="bar" style={{ backgroundColor: 'red' }} />)

      // THEN
      expect(StyleSheet.flatten(getByTestId('bar').props.style).backgroundColor).toBe('red')
    })
  })

  describe('Interaction', () => {
    test('Click on a button', () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByText } = render(<BottomActionBar title="Title" buttons={[{ onPress, title: 'Action!' }]} />)

      // WHEN
      fireEvent.press(getByText('Action!'))

      // THEN
      expect(onPress).toHaveBeenCalled()
    })

    test('Button props are passed to the button', () => {
      // GIVEN
      const onPress = jest.fn()
      const { getByTestId } = render(<BottomActionBar buttons={[{ onPress, title: 'Delete', testID: 'delete' }]} />)

      // WHEN
      fireEvent.press(getByTestId('delete'))

      // THEN
      expect(onPress).toHaveBeenCalled()
    })
  })

  describe('Snackbar inset', () => {
    test('The height is reported to the snackbar', () => {
      // GIVEN
      const reporter: SnackbarReporter = {
        setContentInset: jest.fn(),
        removeContentInset: jest.fn(),
        addOpenModal: jest.fn(),
        removeOpenModal: jest.fn(),
      }
      const { getByTestId } = render(
        <SnackbarReporterContext.Provider value={reporter}>
          <NavigationContext.Provider value={mockNavigationContext}>
            <BottomActionBar testID="bar" />
          </NavigationContext.Provider>
        </SnackbarReporterContext.Provider>,
      )

      // WHEN
      fireEvent(getByTestId('bar'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: 0, height: 65 } } })

      // THEN
      expect(reporter.setContentInset).toHaveBeenCalledWith(expect.any(String), 65)
    })
  })
})
