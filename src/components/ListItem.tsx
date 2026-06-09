import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Icon, IconProps } from '@observation.org/react-native-components'

import SingleLine from './SingleLine'
import { Theme, useStyles, useTheme } from '../theme'

type Props = {
  icon?: IconProps
  label: string
  subLabel?: string
  extraSubLabel?: string
  onPress?: () => void
  selected?: boolean
}

const ListItem = ({ icon, onPress, label, subLabel, extraSubLabel, selected = false }: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  const iconMarginRight = subLabel ? theme.margin.common : theme.margin.half
  const containerPaddingVertical = subLabel ? 7 : 13
  const containerBackgroundColor = selected ? theme.color.primary50 : undefined

  const renderIcon = (() => {
    switch (true) {
      case !!icon:
        return (
          <Icon
            name={icon!.name}
            style={icon!.style ?? 'solid'}
            color={icon!.color ?? theme.color.grey500}
            size={icon!.size ?? theme.icon.size.s}
          />
        )
      case selected:
        return (
          <Icon name={'circle-check'} style={'solid'} color={theme.color.icon.system.brand} size={theme.icon.size.xl} />
        )
      default:
        return (
          <Icon name={'circle'} style={'light'} color={theme.color.icon.system.disabled} size={theme.icon.size.xl} />
        )
    }
  })()

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} disabled={!onPress}>
      <View
        style={[
          styles.containerStyle,
          { paddingVertical: containerPaddingVertical, backgroundColor: containerBackgroundColor },
        ]}
      >
        <View style={{ marginRight: iconMarginRight }}>{renderIcon}</View>
        <View style={{ flex: 1 }}>
          <SingleLine style={styles.labelTextStyle}>{label}</SingleLine>
          {subLabel && (
            <View style={{ flexDirection: 'row', gap: theme.margin.half }}>
              <SingleLine style={styles.subLabelTextStyle}>{subLabel}</SingleLine>
              {extraSubLabel && <SingleLine style={styles.subLabelTextStyle}>{extraSubLabel}</SingleLine>}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.margin.common,
    },
    labelTextStyle: {
      ...theme.font.medium,
      lineHeight: theme.lineHeight.small,
      color: theme.color.text.system.strong,
    },
    subLabelTextStyle: {
      ...theme.font.extraSmall,
      color: theme.color.text.system.subtler,
    },
  })
