import React from 'react'

import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react-native'

import DateFromToFilter from '../DateFromToFilter'

describe('DateFromToFilter', () => {
  const onPressFrom = jest.fn()
  const onPressTo = jest.fn()

  const dateFromLabel = 'Start date'
  const dateToLabel = 'End date'

  describe('Rendering', () => {
    test('No date selected', () => {
      const { queryByText, toJSON } = render(
        <DateFromToFilter
          dateFrom={undefined}
          dateTo={undefined}
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      expect(queryByText('Start date')).toBeTruthy()
      expect(queryByText('End date')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('From date selected', () => {
      const { queryByText, toJSON } = render(
        <DateFromToFilter
          dateFrom="2026-01-31"
          dateTo={undefined}
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      expect(queryByText('2026-01-31')).toBeTruthy()
      expect(queryByText('End date')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('To date selected', () => {
      const { queryByText, toJSON } = render(
        <DateFromToFilter
          dateFrom={undefined}
          dateTo="2025-02-15"
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      expect(queryByText('Start date')).toBeTruthy()
      expect(queryByText('2025-02-15')).toBeTruthy()
      expect(toJSON()).toMatchSnapshot()
    })

    test('From and date selected', () => {
      const { queryByText, toJSON } = render(
        <DateFromToFilter
          dateFrom="2026-01-31"
          dateTo="2025-02-15"
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      expect(queryByText('2026-01-31')).toBeTruthy()
      expect(queryByText('2025-02-15')).toBeTruthy()
      expect(queryByText('Start date')).toBeFalsy()
      expect(queryByText('End date')).toBeFalsy()
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Interaction', () => {
    test('Clicking on the from date will call the callback', async () => {
      // GIVEN
      const { getByTestId } = render(
        <DateFromToFilter
          dateFrom="2026-01-31"
          dateTo="2025-02-15"
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      // WHEN
      await fireEvent.press(getByTestId('date-filter-field-from'))

      // THEN
      expect(onPressFrom).toHaveBeenCalled()
    })

    test('Clicking on the to date will call the callback', async () => {
      // GIVEN
      const { getByTestId } = render(
        <DateFromToFilter
          dateFrom="2026-01-31"
          dateTo="2025-02-15"
          emptyDateFromLabel={dateFromLabel}
          emptyDateToLabel={dateToLabel}
          onPressFrom={onPressFrom}
          onPressTo={onPressTo}
        />,
      )

      // WHEN
      await fireEvent.press(getByTestId('date-filter-field-to'))

      // THEN
      expect(onPressTo).toHaveBeenCalled()
    })
  })
})
