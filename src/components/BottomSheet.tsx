import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import { useTheme as useNavigationTheme } from '@react-navigation/native'

import LargeButton, { LargeButtonProps } from './LargeButton'
import { shadow } from '../styles'
import { Theme, useStyles, useTheme } from '../theme/'

type Props = {
  title?: string
  text?: string
  buttons?: LargeButtonProps[]
  style?: StyleProp<ViewStyle>
  testID?: string
  children?: React.ReactNode
}

const BottomSheet = ({ title, text, buttons = [], style, testID, children }: Props) => {
  const { colors } = useNavigationTheme()
  const theme = useTheme()
  const styles = useStyles(createStyles)

  const buttonsMarginTop = title || text ? theme.margin.common : 0
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={[styles.bottomSheetContainer, { backgroundColor: colors.card }]}>
        <View style={styles.bottomSheet}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {title && (
              <View style={{ flex: 1 }}>
                <Text style={theme.text.lead}>{title}</Text>
              </View>
            )}
          </View>
          {text && (
            <View style={{ marginTop: theme.margin.half }}>
              <Text style={theme.text.body}>{text}</Text>
            </View>
          )}
          {children}
          {buttons && buttons.length > 0 && (
            <View style={[styles.buttonContainer, { marginTop: buttonsMarginTop }]}>
              {buttons.map((button) => (
                <LargeButton
                  iconName={button.iconName}
                  disabled={button.disabled}
                  secondary={button.secondary}
                  title={button.title}
                  key={button.title}
                  style={styles.buttonStyle}
                  onPress={button.onPress}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default BottomSheet

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...shadow.normal.ios,
      borderTopWidth: 1 / 3,
      borderTopColor: theme.color.grey300,
    },
    bottomSheetContainer: {
      ...shadow.normal.android,
    },
    bottomSheet: {
      flexDirection: 'column',
      margin: theme.margin.common,
    },
    buttonContainer: {
      marginHorizontal: -theme.margin.half,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    buttonStyle: {
      flex: 1,
      margin: 0,
      marginHorizontal: theme.margin.half,
    },
  })
