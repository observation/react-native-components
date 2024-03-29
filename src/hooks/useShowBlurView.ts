import React, { useState } from 'react'
import { InteractionManager, Platform } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

const isIOSDevice = Platform.OS === 'ios'

// Fix for TypeScript picking up the incorrect typing (node instead of react-native) for setTimeout
type Timeout = ReturnType<typeof setTimeout>

/**
 * On Android devices the BlurView should wait for all interactions to finish.
 * This is because it sometimes displays the wrong stack-components in the transparent background if it is displayed immediately.
 * Because back-navigation from login-screen crashes the screen, additional timeout is added.
 * iOS devices can display the BlurView right away
 */
const useShowBlurView = () => {
  const [showBlurView, setShowBlurView] = useState(isIOSDevice)

  useFocusEffect(
    React.useCallback(() => {
      let timer: Timeout
      const timeout = isIOSDevice ? 0 : 200
      const task = InteractionManager.runAfterInteractions(() => {
        timer = setTimeout(() => {
          setShowBlurView(true)
        }, timeout)
      })

      return () => {
        task.cancel()
        clearTimeout(timer)
        setShowBlurView(isIOSDevice)
      }
    }, []),
  )

  return showBlurView
}

export default useShowBlurView
