import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ScalableImage from 'react-native-scalable-image'

import { rounded } from '../styles'
import { Theme, useStyles, useTheme } from '../theme'

/** The image that was pressed, with the title and description from its `alt` text */
type PressedContentImage = {
  src: string
  title?: string
  description?: string
}

type Props = {
  src: string
  /** Title and description, separated by a `|`. Without it, the image is shown inline. */
  alt?: string
  /** Called when the image is pressed, e.g. to show it in a photo gallery. Without it, the image can't be pressed. */
  onPress?: (image: PressedContentImage) => void
}

const ContentImage = ({ src, alt, onPress }: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  if (!alt) {
    return <ScalableImage width={Dimensions.get('window').width - 2 * theme.margin.common} source={{ uri: src }} />
  }
  const [title, description] = alt.trim().split(/\s*\|\s*/)
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        testID="photo"
        onPress={() => onPress?.({ src, title, description })}
        disabled={!onPress}
        activeOpacity={0.5}
      >
        <View style={styles.shadowContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: src }} />
            </View>
            <View style={styles.textContainer}>
              <View>
                {!!title && (
                  <Text style={styles.title} numberOfLines={2}>
                    {title}
                  </Text>
                )}
                {!!description && (
                  <Text style={styles.description} numberOfLines={3}>
                    {description}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ContentImage
export type { PressedContentImage }

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    outerContainer: {
      margin: -theme.margin.common,
      marginBottom: -theme.margin.half,
    },
    shadowContainer: {
      margin: theme.margin.common,
      borderRadius: rounded.large.borderRadius,
      backgroundColor: theme.color.background.system.surfaceBase,
      ...theme.shadow.small.ios,
    },
    innerContainer: {
      flexDirection: 'row',
      backgroundColor: theme.color.background.system.surfaceBase,
      ...theme.shadow.small.android,
      ...rounded.large,
      borderWidth: 1,
      borderColor: theme.color.border.system.subtlest,
    },
    imageContainer: {
      margin: theme.margin.common,
      marginRight: theme.margin.half,
      ...rounded.large,
    },
    image: {
      height: 80,
      width: 80,
    },
    textContainer: {
      flex: 1,
      marginRight: theme.margin.common,
      marginLeft: theme.margin.half,
      justifyContent: 'center',
    },
    title: {
      ...theme.font.smallBold,
      color: theme.color.text.system.strong,
      marginBottom: theme.margin.quarter,
    },
    description: {
      ...theme.font.small,
      color: theme.color.text.system.subtler,
    },
  })

  return styles
}
