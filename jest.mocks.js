/* eslint-disable observation/no-function-without-logging */
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import { Image } from 'react-native'
import 'react-native-gesture-handler/jestSetup'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

// === Globals ===

if (typeof global.requestIdleCallback === 'undefined') {
  global.requestIdleCallback = function (callback) {
    return setTimeout(function () {
      callback({
        timeRemaining: function () {
          return 50
        },
        didTimeout: false,
      })
    }, 0)
  }
}

if (typeof global.cancelIdleCallback === 'undefined') {
  global.cancelIdleCallback = function (id) {
    clearTimeout(id)
  }
}

// === Third-party libraries ===

jest.mock('@fortawesome/react-native-fontawesome', () => {
  const Icon = 'Icon'

  const getIconType = (prefix) => {
    switch (prefix) {
      case 'fas':
        return 'solid'
      case 'fal':
        return 'light'
      case 'fab':
        return 'brand'
      default:
        throw new Error()
    }
  }

  return {
    FontAwesomeIcon: (faIcon) => (
      <Icon
        testID={faIcon.testID}
        color={faIcon.color}
        name={faIcon.icon.iconName}
        size={faIcon.size}
        style={faIcon.style}
        type={getIconType(faIcon.icon.prefix)}
        transform={faIcon.transform}
      />
    ),
  }
})

Image.getSizeWithHeaders = jest.fn(() => Promise.resolve({ width: 0, height: 0 }))

// Mock out configureNext for LayoutAnimation
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  ...jest.requireActual('react-native/Libraries/LayoutAnimation/LayoutAnimation'),
  configureNext: jest.fn(),
}))

jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'))

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

