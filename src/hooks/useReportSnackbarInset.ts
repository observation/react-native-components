import { useCallback, useContext, useEffect, useId, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

import { NavigationContext } from '@react-navigation/native'

import Log from '../lib/Log'
import SnackbarReporterContext from '../lib/SnackbarReporterContext'

/**
 * Report the height of a UI element at the bottom of the screen, so the global snackbar is shown above it.
 * The height is only reported while the screen of the element is focused.
 *
 * @param extraHeight Height to add to the measured height, e.g. for a margin outside the measured view
 * @returns The `onLayout` handler to attach to the root view of the element, or `undefined` when there is
 * nothing to report to or no screen to follow the focus of (e.g. in tests)
 */
const useReportSnackbarInset = (extraHeight = 0) => {
  const reporter = useContext(SnackbarReporterContext)
  const navigation = useContext(NavigationContext)
  const id = useId()
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [focused, setFocused] = useState(() => navigation?.isFocused() ?? false)

  useEffect(() => {
    if (!navigation) return

    setFocused(navigation.isFocused())
    const unsubscribeFocus = navigation.addListener('focus', () => {
      Log.debug('useReportSnackbarInset:focus')
      setFocused(true)
    })
    const unsubscribeBlur = navigation.addListener('blur', () => {
      Log.debug('useReportSnackbarInset:blur')
      setFocused(false)
    })
    return () => {
      Log.debug('useReportSnackbarInset:unsubscribe')
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])

  useEffect(() => {
    if (!reporter || !focused || height === undefined) return

    reporter.setContentInset(id, height + extraHeight)
    return () => {
      Log.debug('useReportSnackbarInset:removeContentInset', id)
      reporter.removeContentInset(id)
    }
  }, [reporter, focused, height, extraHeight, id])

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    Log.debug('useReportSnackbarInset:onLayout', event.nativeEvent.layout.height)
    setHeight(event.nativeEvent.layout.height)
  }, [])

  return reporter && navigation ? onLayout : undefined
}

export default useReportSnackbarInset
