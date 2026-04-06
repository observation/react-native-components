import { Text, Theme } from '../types'

export const createTextStyles = (theme: Theme) =>
  ({
    iconLabel: {
      ...theme.font.extraSmall,
      color: theme.color.grey800,
    },
    tabIconLabel: {
      ...theme.font.small,
      color: theme.color.grey800,
    },
    inputLabel: {
      ...theme.font.smallBold,
      color: theme.color.grey800,
    },
    scientificName: {
      ...theme.font.small,
      fontStyle: 'italic',
      color: theme.color.grey500,
    },
    body: {
      ...theme.font.medium,
      color: theme.color.grey800,
    },
    light: {
      ...theme.font.medium,
      color: theme.color.grey500,
    },
    lead: {
      ...theme.font.mediumBold,
      color: theme.color.black,
    },
    link: {
      ...theme.font.medium,
      color: theme.color.primary500,
    },
    linkBold: {
      ...theme.font.mediumBold,
      color: theme.color.primary500,
    },
    input: {
      ...theme.font.large,
      color: theme.color.black,
    },
    subtitle: {
      ...theme.font.largeBold,
      color: theme.color.black,
    },
    title: {
      ...theme.font.extraLargeBold,
      color: theme.color.black,
    },
    percentage: {
      ...theme.font.smallLight,
      color: theme.color.black,
    },
    thumbnail: {
      ...theme.font.extraSmall,
      lineHeight: 16,
      fontWeight: 'bold',
      color: theme.color.white,
    },
  }) satisfies Text
