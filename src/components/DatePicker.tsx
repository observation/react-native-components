import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import CalendarPicker from 'react-native-calendar-picker'

import Log from '../lib/Log'
import { useStyles, useTheme } from '../theme'

type Props = {
  selectedDate: Date
  onDateChange: (date: Date) => void
  minimumDate?: Date
  maximumDate?: Date
  labelNext: string
  labelPrevious: string
  labelSelectMonth: string
  labelSelectYear: string
  labelsShortWeekdays: string[]
  labelsMonths: string[]
}

const DatePicker = ({
  selectedDate,
  onDateChange,
  minimumDate,
  maximumDate,
  labelNext,
  labelPrevious,
  labelSelectMonth,
  labelSelectYear,
  labelsShortWeekdays,
  labelsMonths,
}: Props) => {
  Log.debug('DatePicker:render')

  const theme = useTheme()
  const styles = useStyles(createStyles)

  return (
    <View style={styles.container}>
      <CalendarPicker
        // @ts-expect-error The component doesn't allow property testID
        testID="calendar-picker"
        display={'inline'}
        onDateChange={onDateChange}
        minDate={minimumDate}
        maxDate={maximumDate}
        restrictMonthNavigation={true}
        selectedStartDate={selectedDate}
        initialDate={selectedDate}
        textStyle={{ fontFamily: 'Ubuntu' }}
        selectedDayColor={theme.color.background.system.brand}
        selectedDayTextColor={theme.color.text.system.staticWhite}
        nextTitle={labelNext}
        nextTitleStyle={{ color: theme.color.text.system.brand }}
        previousTitle={labelPrevious}
        previousTitleStyle={{ color: theme.color.text.system.brand }}
        selectMonthTitle={labelSelectMonth + ' '}
        selectYearTitle={labelSelectYear}
        monthTitleStyle={{ color: theme.color.text.system.brand }}
        yearTitleStyle={{ color: theme.color.text.system.brand }}
        weekdays={labelsShortWeekdays}
        months={labelsMonths}
      />
    </View>
  )
}

export default DatePicker

// The height of the calendar is not constant, but depends on the number of weeks in a month.
// To prevent the popup to jump up and down, use a fixed height for the calendar, which is always
// large enough to hold 6 week rows. 90% of the screen width seems to work in all aspect ratio's.
export const calendarHeight = Dimensions.get('window').width * 0.9

const createStyles = () => {
  const styles = StyleSheet.create({
    container: {
      height: calendarHeight,
    },
  })
  return styles
}
