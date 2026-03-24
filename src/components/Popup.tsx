import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'

import { BlurView } from '@react-native-community/blur'

import { Theme } from '../@types/theme'
import useShowBlurView from '../hooks/useShowBlurView'
import { layout } from '../styles'
import { useStyles } from '../theme/ThemeProvider'

type Props = {
  visible: boolean
  children?: React.ReactNode
}

const Popup = ({ children, visible }: Props) => {
  const showBlurView = useShowBlurView()
  const styles = useStyles(createStyles)

  return (
    <Modal transparent animationType="fade" visible={visible} style={{ flex: 1 }}>
      {showBlurView && <BlurView style={layout.absolute} blurType="light" blurAmount={2} />}
      <View style={styles.modalBackground}>
        <View style={styles.viewPort}>{children}</View>
      </View>
    </Modal>
  )
}

export default Popup

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: theme.overlay.grey60,
    },
    viewPort: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  })
