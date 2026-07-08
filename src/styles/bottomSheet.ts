import { StyleSheet } from 'react-native'

import { Theme } from '../theme'

export const createBottomSheetStyles = (theme: Theme) =>
  StyleSheet.create({
    handleIndicator: {
      backgroundColor: theme.color.grey800,
      height: 4,
      margin: -2,
      width: 48,
    },
    handle: {
      borderTopLeftRadius: theme.margin.common,
      borderTopRightRadius: theme.margin.common,
      height: 20,
    },
  })
