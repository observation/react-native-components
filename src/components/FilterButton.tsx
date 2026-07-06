import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Icon } from '@observation.org/react-native-components'
import { rounded } from '@observation.org/react-native-components/styles'

import { Theme, useStyles, useTheme } from '../theme'

type FilterButtonProps = {
  disabled?: boolean
  activeFilters?: number
  label: string
  onPress?: () => void
}

const FilterButton = ({ activeFilters = 0, label, onPress }: FilterButtonProps) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  const backgroundColor = activeFilters > 0 ? theme.color.primary50 : theme.color.background.system.surfaceBase
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.titleContainer}>
        <View style={styles.iconContainerStyle}>
          <Icon name="bars-filter" size={theme.icon.size.s} color={theme.color.icon.system.brand} />
        </View>
        <Text style={styles.title}>{label}</Text>
        {activeFilters > 0 && (
          <View style={styles.activeFilterContainer}>
            <Text style={styles.activeFilter}>{activeFilters}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default FilterButton

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      ...rounded.normal,
      borderWidth: 2,
      borderColor: theme.color.border.system.brand,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlignVertical: 'center',
      ...theme.font.small,
      color: theme.color.text.system.brand,
    },
    titleContainer: {
      marginHorizontal: theme.margin.half,
      flexDirection: 'row',
    },
    iconContainerStyle: {
      justifyContent: 'center',
      paddingRight: theme.margin.half,
    },
    activeFilterContainer: {
      ...rounded.normal,
      marginLeft: theme.margin.half,
      width: theme.icon.size.xl,
      height: theme.icon.size.xl,
      backgroundColor: theme.color.background.system.brand,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeFilter: {
      textAlignVertical: 'center',
      ...theme.font.small,
      color: theme.color.text.system.staticWhite,
    },
  })
  return styles
}
