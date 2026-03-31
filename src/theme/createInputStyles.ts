import { StyleSheet } from 'react-native'

import { Theme } from './types'
import { rounded } from '../styles/rounded'

export const createInputStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      ...rounded.normal,
      flex: 1,
      minHeight: 40,
      borderWidth: 2,
      paddingLeft: theme.margin.half,
      paddingRight: theme.margin.double,
    },
  })
