import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Log from '../lib/Log'
import { Theme, useStyles, useTheme } from '../theme'
import { Icon } from './Icon'

type FilterOptionProps = {
  title: string
  active?: boolean
  onPress?: () => void
}

const FilterOption = ({ title, active = false, onPress }: FilterOptionProps) => {
  Log.debug('FilterOption:render')

  const theme = useTheme()
  const styles = useStyles(createStyles)

  const backgroundColor = active ? theme.color.background.system.active : theme.color.background.system.surfaceRaised
  const borderColor = active ? theme.color.border.system.brand : theme.color.border.system.subtle
  const titleColor = active ? theme.color.text.system.brand : theme.color.text.system.subtler

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor, borderColor: borderColor }]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={styles.titleContainer}>
        {active && (
          <View style={styles.iconContainerStyle}>
            <Icon name="check" size={theme.icon.size.m} color={theme.color.icon.system.brand} />
          </View>
        )}
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FilterOption

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      borderWidth: 2,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlignVertical: 'center',
      ...theme.font.medium,
      color: theme.color.text.system.subtle,
    },
    titleContainer: {
      marginHorizontal: theme.margin.half,
      flexDirection: 'row',
    },
    iconContainerStyle: {
      justifyContent: 'center',
      paddingRight: theme.margin.half,
    },
  })
  return styles
}
