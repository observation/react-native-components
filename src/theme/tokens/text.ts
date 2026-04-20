import { Text, Theme } from '../types'

export const createTextStyles = (theme: Theme) =>
  ({
    iconLabel: {
      ...theme.font.extraSmall,
      color: theme.color.text.system.subtle,
    },
    tabIconLabel: {
      ...theme.font.small,
      color: theme.color.text.system.subtle,
    },
    inputLabel: {
      ...theme.font.smallBold,
      color: theme.color.text.system.subtle,
    },
    scientificName: {
      ...theme.font.small,
      fontStyle: 'italic',
      color: theme.color.text.system.subtler,
    },
    body: {
      ...theme.font.medium,
      color: theme.color.text.system.subtle,
    },
    light: {
      ...theme.font.medium,
      color: theme.color.text.system.subtler,
    },
    lead: {
      ...theme.font.mediumBold,
      color: theme.color.text.system.strong,
    },
    link: {
      ...theme.font.medium,
      color: theme.color.text.system.link,
    },
    linkBold: {
      ...theme.font.mediumBold,
      color: theme.color.text.system.link,
    },
    input: {
      ...theme.font.large,
      color: theme.color.text.system.strong,
    },
    subtitle: {
      ...theme.font.largeBold,
      color: theme.color.text.system.strong,
    },
    title: {
      ...theme.font.extraLargeBold,
      color: theme.color.text.system.strong,
    },
    percentage: {
      ...theme.font.smallLight,
      color: theme.color.text.system.strong,
    },
    thumbnail: {
      ...theme.font.extraSmall,
      lineHeight: 16,
      fontWeight: 'bold',
      color: theme.color.text.system.staticWhite,
    },
  }) satisfies Text
