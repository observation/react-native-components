import { MixedStyleDeclaration } from 'react-native-render-html'

import textStyle from './text'
import theme from './theme'

/**
 * Styles for HTML tags
 *
 * Note that we can only use plain JavaScript objects here, not StyleSheet instances
 */
const html: Readonly<Record<string, MixedStyleDeclaration>> = {
  h1: {
    ...textStyle.title,
    marginTop: 0,
    marginBottom: 0,
  },

  h2: {
    ...textStyle.subtitle,
    color: theme.color.black,
    marginTop: theme.margin.common,
    marginBottom: 0,
  },

  h3: {
    ...textStyle.lead,
    marginTop: theme.margin.common,
    marginBottom: 0,
  },

  ul: {
    marginTop: theme.margin.common,
    paddingLeft: theme.margin.common,
    marginBottom: theme.margin.half,
  },

  ol: {
    marginTop: theme.margin.common,
    paddingLeft: theme.margin.common,
    marginBottom: theme.margin.half,
  },

  li: {
    marginBottom: theme.margin.half,
  },

  a: {
    color: theme.color.primary,
    textDecorationLine: 'none',
  },
}

export default html
