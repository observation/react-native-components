import React, { useContext, useEffect, useId } from 'react'

import { useIsFocused } from '@react-navigation/native'

import Log from '../lib/Log'
import SnackbarReporterContext from '../lib/SnackbarReporterContext'

type Props = {
  children: React.ReactElement
}

/**
 * Reports that a modal screen is open while it is focused, so the global snackbar is suppressed until the modal is closed
 * instead of covering it.
 */
const ModalReporter = ({ children }: Props) => {
  const reporter = useContext(SnackbarReporterContext)
  const isFocused = useIsFocused()
  const id = useId()

  useEffect(() => {
    Log.debug('ModalReporter:useEffect', { isFocused })
    if (!reporter || !isFocused) return

    reporter.addOpenModal(id)
    return () => {
      Log.debug('ModalReporter:removeOpenModal', id)
      reporter.removeOpenModal(id)
    }
  }, [reporter, isFocused, id])

  return children
}

export default ModalReporter
