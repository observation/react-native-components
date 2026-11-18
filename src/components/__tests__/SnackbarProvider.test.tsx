import React, { useContext } from 'react'

import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react-native'

import SnackbarReporterContext, { SnackbarReporter } from '../../lib/SnackbarReporterContext'
import { useSnackbarStore } from '../../lib/SnackbarStoreContext'
import SnackbarStore from '../../stores/SnackbarStore'
import SnackbarProvider from '../SnackbarProvider'

describe('SnackbarProvider', () => {
  test('The store is provided for showing messages and for reporting', () => {
    // GIVEN
    const store = new SnackbarStore()
    let providedStore: SnackbarStore | undefined
    let providedReporter: SnackbarReporter | undefined
    const Consumer = () => {
      providedStore = useSnackbarStore()
      providedReporter = useContext(SnackbarReporterContext)
      return null
    }

    render(
      <SnackbarProvider store={store}>
        <Consumer />
      </SnackbarProvider>,
    )

    // THEN
    expect(providedStore).toBe(store)
    expect(providedReporter).toBe(store)
  })
})
