/* eslint-disable observation/no-function-without-logging */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import mockBottomSheet from '@gorhom/bottom-sheet/mock'

class MockBottomSheetModal extends React.Component {
  snapToIndex() {}
  snapToPosition() {}
  expand() {}
  collapse() {}
  close() {}
  forceClose() {}
  present() {}
  dismiss() {}

  render() {
    const mockAnimatedPosition = { value: 0 }
    return (
      <>
        {this.props.children}
        {this.props.backdropComponent({ animatedPosition: mockAnimatedPosition })}
      </>
    )
  }
}

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
  BottomSheetModal: MockBottomSheetModal,
}
