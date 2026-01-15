/* eslint-disable observation/no-function-without-logging */
import React from 'react'
import { Image } from 'react-native'

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
