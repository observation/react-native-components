import { Platform, LayoutAnimation } from 'react-native'

import Log from '../lib/Log'

const safeLayoutAnimation = (tag: string) => {
  Log.debug('Utils:safeLayoutAnimation', tag)
  if (Platform.OS === 'ios') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
}

const unsafeLayoutAnimation = (tag: string) => {
  Log.debug('Utils:unsafeLayoutAnimation', tag)
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

export { safeLayoutAnimation, unsafeLayoutAnimation }
