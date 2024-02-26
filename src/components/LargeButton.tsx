import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import { IconName } from '../lib/Icons'
import * as LargeButtonStyles from '../lib/LargeButtonStyles'
import { LargeButtonStyle } from '../lib/LargeButtonStyles'
import Log from '../lib/Log'
import appTextStyle from '../styles/text'
import theme from '../styles/theme'

type LargeButtonProps = {
  title: string
  onPress?: () => void
  onPressIn?: () => void
  iconName?: IconName
  disabled?: boolean
  secondary?: boolean
  danger?: boolean
  style?: StyleProp<ViewStyle>
  testID?: string
}

const getStyle = (secondary?: boolean, disabled?: boolean, danger?: boolean): LargeButtonStyle => {
  Log.trace('LargeButton:getStyle')

  const enabled = !disabled
  const primary = !secondary

  switch (true) {
    case primary && enabled && danger:
      return LargeButtonStyles.primaryDanger
    case primary && enabled && !danger:
      return LargeButtonStyles.primary
    case primary && disabled && !danger:
      return LargeButtonStyles.primaryDisabled
    case secondary && enabled && danger:
      return LargeButtonStyles.secondaryDanger
    case secondary && enabled && !danger:
      return LargeButtonStyles.secondary
    case secondary && disabled && !danger:
      return LargeButtonStyles.secondaryDisabled

    default:
      return LargeButtonStyles.primary
  }
}

const LargeButton = ({
  secondary,
  disabled,
  danger,
  style,
  title,
  iconName,
  onPress,
  onPressIn,
  testID = 'touchable-opacity',
}: LargeButtonProps) => {
  const { textStyle, buttonStyle, iconColor } = getStyle(secondary, disabled, danger)

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
            <Icon name={iconName} size={theme.icon.size.large} color={iconColor} />
          </View>
        )}
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LargeButton
export type { LargeButtonProps }

const styles = StyleSheet.create({
  container: {
    ...theme.rounded,
    margin: theme.margin.common,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlignVertical: 'center',
    ...appTextStyle.lead,
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
