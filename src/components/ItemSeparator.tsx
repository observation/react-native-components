import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { Theme, useStyles } from '../theme'

type Orientation = 'horizontal' | 'vertical'

type Props = {
  style?: StyleProp<ViewStyle>
  orientation?: Orientation
}

const ItemSeparator = ({ style, orientation = 'horizontal' }: Props) => {
  const styles = useStyles(createStyles)
  const separatorStyle = orientation === 'horizontal' ? styles.horizontalSeparator : styles.verticalSeparator
  return <View style={[separatorStyle, style]} />
}

export default ItemSeparator

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    horizontalSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.color.background.system.surfaceRaised,
    },
    verticalSeparator: {
      borderRightWidth: 1,
      borderRightColor: theme.color.background.system.surfaceRaised,
    },
  })
