import { Platform } from 'react-native'

import { Font, Theme } from '../types'

export const createFont = (theme: Theme): Font =>
  ({
    extraExtraSmall: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.extraExtraSmall,
      lineHeight: theme.lineHeight.extraExtraSmall,
      fontWeight: 'normal',
    },
    extraSmall: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.extraSmall,
      lineHeight: theme.lineHeight.extraSmall,
      fontWeight: 'normal',
    },
    small: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.small,
      lineHeight: theme.lineHeight.small,
      fontWeight: 'normal',
    },
    smallBold: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.small,
      lineHeight: theme.lineHeight.small,
      fontWeight: 'bold',
    },
    smallLight: {
      fontFamily: Platform.OS === 'android' ? 'Ubuntu-Light' : 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.small,
      lineHeight: theme.lineHeight.small,
      fontWeight: '100',
    },
    medium: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.medium,
      lineHeight: theme.lineHeight.medium,
      fontWeight: 'normal',
    },
    mediumBold: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.medium,
      lineHeight: theme.lineHeight.medium,
      fontWeight: 'bold',
    },
    large: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.large,
      lineHeight: theme.lineHeight.large,
      fontWeight: 'normal',
    },
    largeBold: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.large,
      lineHeight: theme.lineHeight.large,
      fontWeight: 'bold',
    },
    extraLarge: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.extraLarge,
      lineHeight: theme.lineHeight.extraLarge,
      fontWeight: 'normal',
    },
    extraLargeBold: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.extraLarge,
      lineHeight: theme.lineHeight.extraLarge,
      fontWeight: 'bold',
    },
    huge: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.huge,
      lineHeight: theme.lineHeight.huge,
      fontWeight: 'normal',
    },
    hugeBold: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: theme.fontSize.huge,
      lineHeight: theme.lineHeight.huge,
      fontWeight: 'bold',
    },
  }) satisfies Font
