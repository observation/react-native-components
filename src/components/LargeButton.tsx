import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import { IconName } from '../lib/Icons'
import * as LargeButtonStyles from '../lib/LargeButtonStyles'
import { LargeButtonStyle } from '../lib/LargeButtonStyles'
import Log from '../lib/Log'
import { rounded } from '../styles'
import { Theme, useStyles, useTheme } from '../theme'

type LargeButtonProps = {
  title: string
  titleStyle?: StyleProp<TextStyle>
  onPress?: () => void
  onPressIn?: () => void
  iconName?: IconName
  disabled?: boolean
  secondary?: boolean
  danger?: boolean
  style?: StyleProp<ViewStyle>
  testID?: string
}

const getStyle = (theme: Theme, secondary?: boolean, disabled?: boolean, danger?: boolean): LargeButtonStyle => {
  Log.trace('LargeButton:getStyle')

  const enabled = !disabled
  const primary = !secondary

  switch (true) {
    case primary && enabled && danger:
      return LargeButtonStyles.primaryDanger(theme)
    case primary && enabled && !danger:
      return LargeButtonStyles.primary(theme)
    case primary && disabled && !danger:
      return LargeButtonStyles.primaryDisabled(theme)
    case secondary && enabled && danger:
      return LargeButtonStyles.secondaryDanger(theme)
    case secondary && enabled && !danger:
      return LargeButtonStyles.secondary(theme)
    case secondary && disabled && !danger:
      return LargeButtonStyles.secondaryDisabled(theme)

    default:
      return LargeButtonStyles.primary(theme)
  }
}

const LargeButton = ({
  secondary,
  disabled,
  danger,
  style,
  title,
  titleStyle,
  iconName,
  onPress,
  onPressIn,
  testID = 'touchable-opacity',
}: LargeButtonProps) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  const { textStyle, buttonStyle, iconColor } = getStyle(theme, secondary, disabled, danger)

  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.container, style, buttonStyle]}
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      activeOpacity={0.5}
    >
      <View style={styles.titleContainer}>
        {iconName && (
          <View style={styles.iconContainerStyle}>
            <Icon name={iconName} size={theme.icon.size.l} color={iconColor} />
          </View>
        )}
        <Text style={[styles.title, titleStyle, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LargeButton
export type { LargeButtonProps }

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...rounded.normal,
      margin: theme.margin.common,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlignVertical: 'center',
      ...theme.text.lead,
    },
    titleContainer: {
      marginHorizontal: theme.margin.common,
      flexDirection: 'row',
    },
    iconContainerStyle: {
      justifyContent: 'center',
      paddingRight: theme.margin.half,
    },
  })
