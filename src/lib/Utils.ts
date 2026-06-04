import { LayoutAnimation } from 'react-native'

import Log from '../lib/Log'

export const unsafeLayoutAnimation = (tag: string) => {
  Log.debug('Utils:unsafeLayoutAnimation', tag)
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

export const deepMerge = <T>(target: T, source: Partial<T>): T => {
  Log.debug('Utils:deepMerge')
  for (const key in source) {
    const value = source[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = deepMerge({ ...target[key] }, value)
    } else {
      // @ts-expect-error assignment is safe
      target[key] = value
    }
  }
  return target
}

export const capitalize = (input: string) => input.charAt(0).toUpperCase() + input.slice(1)
