import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import CapitalizeText from './CapitalizeText'
import { Theme, useStyles, useTheme } from '../theme'
import { Icon } from './Icon'

type Props = {
  label?: string
  value?: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  valueStyle?: StyleProp<TextStyle>
  disabled?: boolean
  capitalize?: boolean
  showChevron?: boolean
}

const InputPanel = ({
  label,
  value,
  containerStyle,
  valueStyle,
  onPress,
  disabled = false,
  capitalize = false,
  showChevron = true,
}: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  // TODO: 48 and 36 should be input heights and we should make them dynamically themed
  const paddingVertical = label
    ? (48 - (styles.headerTextStyle.lineHeight! + styles.value.lineHeight!)) / 2
    : (36 - styles.value.lineHeight!) / 2

  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, containerStyle]} onPress={onPress}>
      <View style={[styles.contentContainer, { paddingVertical }]}>
        {label && (
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerTextStyle}>
            {label}
          </Text>
        )}
        {capitalize && value ? (
          <CapitalizeText numberOfLines={1} ellipsizeMode="tail" style={[styles.value, valueStyle]}>
            {value}
          </CapitalizeText>
        ) : (
          <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.value, valueStyle]}>
            {value || ' '}
          </Text>
        )}
      </View>
      {showChevron && (
        <View style={styles.icon}>
          <Icon name="angle-down" color={theme.color.grey500} size={theme.icon.size.m} />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default InputPanel

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.margin.common,
    },
    headerTextStyle: {
      ...theme.font.extraSmall,
      lineHeight: theme.font.extraSmall.fontSize,
      letterSpacing: 0.03 * theme.font.extraSmall.fontSize,
      color: theme.color.text.system.subtler,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    value: {
      ...theme.font.medium,
      color: theme.color.text.system.strong,
    },
    icon: {
      marginLeft: theme.margin.half,
    },
  })
