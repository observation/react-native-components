import React from 'react'

import SnackbarReporterContext from '../lib/SnackbarReporterContext'
import SnackbarStoreContext from '../lib/SnackbarStoreContext'
import SnackbarStore from '../stores/SnackbarStore'

type Props = {
  store: SnackbarStore
  children: React.ReactNode
}

/** Provides the app's snackbar store, for showing messages and for reporting insets and open modals */
const SnackbarProvider = ({ store, children }: Props) => (
  <SnackbarStoreContext.Provider value={store}>
    <SnackbarReporterContext.Provider value={store}>{children}</SnackbarReporterContext.Provider>
  </SnackbarStoreContext.Provider>
)

export default SnackbarProvider
