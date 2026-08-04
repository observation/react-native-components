/* eslint-disable observation/no-function-without-logging */
import React from 'react'
import { View } from 'react-native'

import mockBottomSheet from '@gorhom/bottom-sheet/mock'

class MockBottomSheet extends React.Component {
  snapToIndex() {}
  snapToPosition() {}
  expand() {}
  collapse() {}
  close() {
    this.props.onClose?.()
  }
  forceClose() {}

  render() {
    return (
      <View testID="bottom-sheet">
        {this.props.handleComponent?.()}
        {this.props.children}
        {this.props.backdropComponent()}
      </View>
    )
  }
}

module.exports = {
  __esModule: true,
  ...mockBottomSheet,
  default: MockBottomSheet,
}
