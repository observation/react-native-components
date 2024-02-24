import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'

import { BlurView } from '@react-native-community/blur'

import useShowBlurView from '../hooks/useShowBlurView'
import theme from '../styles/theme'

type Props = {
  visible: boolean
  children?: React.ReactNode
}

const Popup = ({ children, visible }: Props) => {
  const showBlurView = useShowBlurView()

  return (
    <Modal transparent animationType="fade" visible={visible} style={{ flex: 1 }}>
      {showBlurView && <BlurView style={theme.absolute} blurType="light" blurAmount={2} />}
      <View style={styles.modalBackground}>
        <View style={styles.viewPort}>{children}</View>
      </View>
    </Modal>
  )
}

export default Popup

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.color.modalBackground,
  },
  viewPort: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
