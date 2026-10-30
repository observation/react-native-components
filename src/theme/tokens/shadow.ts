import { Shadow, Theme } from '../types'

export const createShadow = (theme: Theme): Shadow => ({
  normal: {
    android: {
      elevation: 6,
      shadowColor: theme.color.shadow.system.elevation,
    },
    ios: {
      shadowOffset: { width: 0, height: 4 },
      shadowColor: theme.color.shadow.system.base,
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
  },
  small: {
    android: {
      elevation: 4,
      shadowColor: theme.color.shadow.system.elevation,
    },
    ios: {
      shadowOffset: { width: 0, height: 2 },
      shadowColor: theme.color.shadow.system.base,
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  },
  none: {
    android: {},
    ios: {},
  },
})
