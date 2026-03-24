import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Icon } from './Icon'
import { Theme } from '../@types/theme'
import LargeButton, { LargeButtonProps } from '../components/LargeButton'
import Popup from '../components/Popup'
import textStyle from '../styles/text'
import { useStyles, useTheme } from '../theme/ThemeProvider'

type NotificationPopupStaticProps = {
  title: string
  message: string
  leftButton: LargeButtonProps
  rightButton?: LargeButtonProps
  onClose?: () => void
}

type NotificationPopupProps = NotificationPopupStaticProps & {
  visible: boolean
}

const NotificationPopup = ({ visible, title, message, leftButton, rightButton, onClose }: NotificationPopupProps) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  return (
    <Popup visible={visible}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          {onClose && (
            <TouchableOpacity testID="close" onPress={onClose} activeOpacity={0.5} style={styles.closeButton}>
              <Icon name="times" color={theme.color.grey500} size={theme.icon.size.xl} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.body}>
          <Text style={textStyle.body}>{message}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <LargeButton {...leftButton} style={styles.leftButton} />
          </View>
          <View style={styles.buttonContainer}>
            {rightButton && <LargeButton {...rightButton} style={styles.rightButton} />}
          </View>
        </View>
      </View>
    </Popup>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: 'white',
      margin: theme.margin.common,
      padding: theme.margin.common,
      borderRadius: theme.margin.common,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      flex: 1,
      ...textStyle.title,
    },
    closeButton: {
      marginLeft: theme.margin.half,
    },
    body: {
      marginTop: theme.margin.common,
      marginBottom: theme.margin.double,
    },
    footer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      width: '50%',
    },
    leftButton: {
      margin: 0,
      marginRight: theme.margin.quarter,
    },
    rightButton: {
      margin: 0,
      marginLeft: theme.margin.quarter,
    },
  })

export default NotificationPopup

export type { NotificationPopupProps, NotificationPopupStaticProps }
