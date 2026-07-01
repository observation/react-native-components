import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import DatePicker from '../DatePicker'

jest.useFakeTimers({ now: new Date('2023-10-31T20:49:12').getTime() })

describe('DatePicker', () => {
  const onDateChange = jest.fn()
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)

  const labelNext = 'Next'
  const labelPrevious = 'Previous'
  const labelSelectMonth = 'Select month'
  const labelSelectYear = 'Select year'
  const labelsShortWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const labelsMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  describe('Rendering', () => {
    test('Initial', () => {
      const { toJSON } = render(
        <DatePicker
          selectedDate={date}
          onDateChange={onDateChange}
          labelNext={labelNext}
          labelPrevious={labelPrevious}
          labelSelectMonth={labelSelectMonth}
          labelSelectYear={labelSelectYear}
          labelsShortWeekdays={labelsShortWeekdays}
          labelsMonths={labelsMonths}
        />,
      )

      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Click on date triggers a callback', () => {
      // GIVEN
      const { getByText } = render(
        <DatePicker
          selectedDate={date}
          onDateChange={onDateChange}
          labelNext={labelNext}
          labelPrevious={labelPrevious}
          labelSelectMonth={labelSelectMonth}
          labelSelectYear={labelSelectYear}
          labelsShortWeekdays={labelsShortWeekdays}
          labelsMonths={labelsMonths}
        />,
      )

      // WHEN
      fireEvent.press(getByText('5'))

      // THEN
      expect(onDateChange).toHaveBeenCalled()
      const [call] = onDateChange.mock.calls
      const [newDate] = call as any
      expect(newDate.toISOString().split('T')[0]).toBe('2024-10-05')
    })
  })
})
