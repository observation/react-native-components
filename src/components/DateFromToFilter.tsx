import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { Icon } from '@observation.org/react-native-components'
import { rounded } from '@observation.org/react-native-components/styles'

import Log from '../lib/Log'
import { Theme, useStyles, useTheme } from '../theme'

const height = 48

type Props = {
  dateFrom: string | undefined
  dateTo: string | undefined
  emptyDateFromLabel: string
  emptyDateToLabel: string
  onPressFrom: () => void
  onPressTo: () => void
  containerStyle?: StyleProp<ViewStyle>
}

const DateFromToFilter = ({
  dateFrom,
  dateTo,
  emptyDateFromLabel,
  emptyDateToLabel,
  onPressFrom,
  onPressTo,
}: Props) => {
  Log.debug('DateFromToFilter:render')

  const theme = useTheme()
  const styles = useStyles(createStyles)

  const fromIsActive = dateFrom !== undefined
  const toIsActive = dateTo !== undefined

  return (
    <View style={styles.dateContainer}>
      <TouchableOpacity
        onPress={onPressFrom}
        style={styles.dateFieldContainer}
        activeOpacity={0.5}
        testID={'date-filter-field-from'}
      >
        <View style={styles.dateInputField}>
          <Icon
            name="calendar-day"
            style="light"
            size={theme.icon.size.m}
            color={fromIsActive ? theme.color.icon.system.brand : theme.color.icon.system.subtle}
          />
          <Text
            style={[
              styles.dateInputText,
              { color: fromIsActive ? theme.color.text.system.brand : theme.color.text.system.subtler },
            ]}
          >
            {dateFrom ? dateFrom : emptyDateFromLabel}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider}>
        <Text>&ndash;</Text>
      </View>

      <TouchableOpacity
        onPress={onPressTo}
        style={styles.dateFieldContainer}
        activeOpacity={0.5}
        testID={'date-filter-field-to'}
      >
        <View style={styles.dateInputField}>
          <Icon
            name="calendar-day"
            style="light"
            size={theme.icon.size.m}
            color={toIsActive ? theme.color.icon.system.brand : theme.color.icon.system.subtle}
          />
          <Text
            style={[
              styles.dateInputText,
              { color: toIsActive ? theme.color.text.system.brand : theme.color.text.system.subtler },
            ]}
          >
            {dateTo ? dateTo : emptyDateToLabel}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DateFromToFilter

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateFieldContainer: {
      flex: 0.5,
    },
    divider: {
      marginHorizontal: theme.margin.half,
      color: theme.color.text.system.subtler,
    },
    dateInputField: {
      ...rounded.large,
      height: height,
      backgroundColor: theme.color.background.system.surfaceRaised,
      paddingLeft: theme.margin.common,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateInputText: {
      ...theme.text.body,
      marginLeft: theme.margin.half,
    },
  })
  return styles
}
