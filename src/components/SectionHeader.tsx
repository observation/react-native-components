import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import { type Theme, useStyles } from '@observation.org/react-native-components/theme'

type Props = {
  title?: string
  containerStyle?: StyleProp<ViewStyle>
}

const SectionHeader = ({ title, containerStyle }: Props) => {
  const styles = useStyles(createStyles)
  return (
    <View style={[styles.header, title ? styles.headerPadding : null, containerStyle]}>
      {title && <Text style={styles.contentHeaderStyle}>{title}</Text>}
    </View>
  )
}

export default SectionHeader

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: theme.margin.common,
      marginTop: theme.margin.common,
    },
    headerPadding: {
      paddingVertical: theme.margin.quarter,
    },
    contentHeaderStyle: {
      ...theme.font.smallBold,
      color: theme.color.text.system.subtler,
    },
  })
