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
    speciesLocalName: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'bold',
      color: theme.color.text.system.strong,
    },
    speciesLocalNameCompact: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: 16,
      lineHeight: 22,
      fontWeight: 'bold',
      color: theme.color.text.system.strong,
    },
    speciesScientificName: {
      fontFamily: 'Ubuntu',
      fontStyle: 'italic',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: 'normal',
      color: theme.color.text.system.subtler,
    },
    body: {
      ...theme.font.medium,
      color: theme.color.text.system.subtle,
    },
    bodyBlack: {
      ...theme.font.medium,
      color: theme.color.text.system.strong,
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
      ...theme.font.medium,
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
    subLabel: {
      ...theme.font.extraSmall,
      color: theme.color.text.system.subtler,
    },
    inputPanelHeader: {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 14,
      fontWeight: 'normal',
      letterSpacing: 0.3,
      color: theme.color.text.system.subtler,
    },
  }) satisfies Text
