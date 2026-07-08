import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import DatePicker from '../DatePicker'

jest.useFakeTimers({ now: new Date('2024-10-15T20:49:12').getTime() })

describe('DatePicker', () => {
  const onDateChange = jest.fn()
  const date = new Date()

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

    test('With a minimum and maximum date', () => {
      // GIVEN
      const minimumDate = new Date('2024-10-10')
      const maximumDate = new Date('2024-10-20')

      // WHEN
      const { toJSON } = render(
        <DatePicker
          selectedDate={date}
          onDateChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          labelNext={labelNext}
          labelPrevious={labelPrevious}
          labelSelectMonth={labelSelectMonth}
          labelSelectYear={labelSelectYear}
          labelsShortWeekdays={labelsShortWeekdays}
          labelsMonths={labelsMonths}
        />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a selected date that is before the minimum date', () => {
      // GIVEN
      const selectedDate = new Date('2024-10-05')
      const minimumDate = new Date('2024-10-10')
      const maximumDate = new Date('2024-10-20')

      // WHEN
      const { toJSON } = render(
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          labelNext={labelNext}
          labelPrevious={labelPrevious}
          labelSelectMonth={labelSelectMonth}
          labelSelectYear={labelSelectYear}
          labelsShortWeekdays={labelsShortWeekdays}
          labelsMonths={labelsMonths}
        />,
      )

      // THEN
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a selected date that is after the maximum date', () => {
      // GIVEN
      const selectedDate = new Date('2024-10-25')
      const minimumDate = new Date('2024-10-10')
      const maximumDate = new Date('2024-10-20')

      // WHEN
      const { toJSON } = render(
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          labelNext={labelNext}
          labelPrevious={labelPrevious}
          labelSelectMonth={labelSelectMonth}
          labelSelectYear={labelSelectYear}
          labelsShortWeekdays={labelsShortWeekdays}
          labelsMonths={labelsMonths}
        />,
      )

      // THEN
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
