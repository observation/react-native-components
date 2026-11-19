import { createContext, useContext } from 'react'

import Log from './Log'
import SnackbarStore from '../stores/SnackbarStore'

/** Provides the app's snackbar store to the snackbar host and hooks like `useScreenMessage` */
const SnackbarStoreContext = createContext<SnackbarStore | undefined>(undefined)

const useSnackbarStore = () => {
  Log.debug('SnackbarStoreContext:useSnackbarStore')
  const snackbarStore = useContext(SnackbarStoreContext)
  if (!snackbarStore) throw new Error('useSnackbarStore must be used within a SnackbarStoreContext provider')
  return snackbarStore
}

export default SnackbarStoreContext
export { useSnackbarStore }
