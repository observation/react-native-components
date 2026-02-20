import { StyleSheet } from 'react-native'

import { rounded } from './rounded'
import theme from './theme'

export const inputStyles = StyleSheet.create({
  input: {
    ...rounded.normal,
    flex: 1,
    minHeight: 40,
    borderWidth: 2,
    paddingLeft: theme.margin.half,
    paddingRight: theme.margin.double,
  },
})
