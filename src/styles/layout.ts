import { Insets, ViewStyle } from 'react-native'

import { LayoutStyles } from '../@types/layout'

const absolute: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const absoluteLeft: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
}

const absoluteRight: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
}

const absoluteTop: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
}

const absoluteBottom: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
}

const hitSlop: Insets = { top: 8, bottom: 8, left: 8, right: 8 }

export const layout = {
  absolute,
  absoluteLeft,
  absoluteRight,
  absoluteTop,
  absoluteBottom,
  hitSlop,
} satisfies LayoutStyles
