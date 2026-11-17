import React, { useContext, useEffect, useId } from 'react'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Log from '../lib/Log'
import SnackbarReporterContext from '../lib/SnackbarReporterContext'

type Props = {
  children: React.ReactElement
}

/**
 * Reports the height of the tab bar while a tab is focused, so the global snackbar is positioned above the tab bar.
 */
const TabBarInsetReporter = ({ children }: Props) => {
  const reporter = useContext(SnackbarReporterContext)
  const tabBarHeight = useBottomTabBarHeight()
  const insets = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const id = useId()

  // The tab bar height includes the bottom safe area inset, which the snackbar already takes into account
  const height = Math.max(0, tabBarHeight - insets.bottom)

  useEffect(() => {
    Log.debug('TabBarInsetReporter:useEffect', { isFocused, height })
    if (!reporter || !isFocused) return

    reporter.setContentInset(id, height)
    return () => {
      Log.debug('TabBarInsetReporter:removeContentInset', id)
      reporter.removeContentInset(id)
    }
  }, [reporter, isFocused, height, id])

  return children
}

export default TabBarInsetReporter
