import { useCallback } from 'react'
import { BackHandler } from 'react-native'

import type BottomSheet from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'

import Log from '../lib/Log'

/**
 * Handles Android hardware back button to close a BottomSheet when focused.
 */
function useBottomSheetBackHandler(bottomSheetRef: React.RefObject<BottomSheet | null>) {
  Log.trace('useBottomSheetBackHandler')

  useFocusEffect(
    useCallback(() => {
      Log.debug('useBottomSheetBackHandler:focus')

      const onBackPress = () => {
        Log.debug('useBottomSheetBackHandler:onBackPress')

        if (!bottomSheetRef.current) return

        bottomSheetRef.current.close()

        return true
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        Log.debug('useBottomSheetBackHandler:onBlur')

        subscription.remove()
      }
    }, [bottomSheetRef]),
  )
}

export default useBottomSheetBackHandler
