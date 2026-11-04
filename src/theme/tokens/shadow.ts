import { Shadow, Theme } from '../types'

export const createShadow = (theme: Theme): Shadow => ({
  none: {
    android: {},
    ios: {},
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
  large: {
    android: {
      elevation: 15,
      shadowColor: theme.color.shadow.system.elevationStrong,
    },
    ios: {
      shadowOffset: { width: 0, height: 8 },
      shadowColor: theme.color.shadow.system.elevation,
      shadowOpacity: 0.4,
      shadowRadius: 10,
    },
  },
  dragged: {
    android: {
      elevation: 6,
      shadowColor: theme.color.shadow.system.elevation,
    },
    ios: {
      shadowOffset: { width: 0, height: 8 },
      shadowColor: theme.color.shadow.system.elevation,
      shadowOpacity: 0.4,
      shadowRadius: 10,
    },
  },
})
