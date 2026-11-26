import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Log from '../lib/Log'
import { type Theme, useStyles } from '../theme'

type Props = {
  title?: string
  description?: string
  /** Additional content below the title and description */
  children?: React.ReactNode
}

const PhotoGalleryFooter = ({ title, description, children }: Props) => {
  Log.trace('PhotoGalleryFooter')

  const styles = useStyles(createStyles)

  return (
    <View>
      {!!title && (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {!!description && (
        <View style={styles.item}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
      {!!children && <View style={styles.item}>{children}</View>}
    </View>
  )
}

export default PhotoGalleryFooter

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    item: {
      marginVertical: theme.margin.quarter,
    },
    title: {
      ...theme.font.largeBold,
      color: theme.color.text.system.staticWhite,
    },
    description: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
    },
  })
  return styles
}
