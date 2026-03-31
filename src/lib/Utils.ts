import Log from '../lib/Log'

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
