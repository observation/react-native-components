import { ShadowStyle, ShadowStyles } from '../@types/shadow'

/** @deprecated Use theme.shadow.normal */
export const normal = {
  android: {
    elevation: 6,
    shadowColor: '#939393',
  },
  ios: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#E6E6E6',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
} satisfies ShadowStyle

/** @deprecated Use theme.shadow.small */
export const small = {
  android: {
    elevation: 4,
    shadowColor: '#939393',
  },
  ios: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#E6E6E6',
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
} satisfies ShadowStyle

/** @deprecated Use theme.shadow */
export const shadow = {
  normal,
  small,
} satisfies ShadowStyles
