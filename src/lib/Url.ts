import { Linking } from 'react-native'

import Log from '../lib/Log'

export const openUrl = (url: string) =>
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url)
    }
    Log.debug('Url:openUrl does not know how to open link', url)
  })
