import { TextStyle } from 'react-native'

import font from './font'
import theme from './theme'

type TextName =
  | 'iconLabel'
  | 'tabIconLabel'
  | 'inputLabel'
  | 'scientificName'
  | 'body'
  | 'light'
  | 'lead'
  | 'link'
  | 'linkBold'
  | 'input'
  | 'subtitle'
  | 'title'
  | 'percentage'
  | 'thumbnail'

const text: Record<TextName, TextStyle> = {
  ...font,
  iconLabel: font.extraSmall,
  tabIconLabel: font.small,
  inputLabel: {
    ...font.smallBold,
    color: theme.color.grey800,
  },
  scientificName: {
    ...font.small,
    fontStyle: 'italic',
    color: theme.color.grey500,
  },
  body: {
    ...font.medium,
    color: theme.color.grey800,
  },
  light: {
    ...font.medium,
    color: theme.color.grey500,
  },
  lead: {
    ...font.mediumBold,
    color: theme.color.black,
  },
  link: {
    ...font.medium,
    color: theme.color.primary500,
  },
  linkBold: {
    ...font.mediumBold,
    color: theme.color.primary500,
  },
  input: {
    ...font.large,
    color: theme.color.black,
  },
  subtitle: {
    ...font.largeBold,
    color: theme.color.black,
  },
  title: {
    ...font.extraLargeBold,
    color: theme.color.black,
  },
  percentage: {
    ...font.smallLight,
    color: theme.color.black,
  },
  thumbnail: {
    ...font.extraSmall,
    lineHeight: 16,
    fontWeight: 'bold',
    color: theme.color.white,
  },
}

export default text
