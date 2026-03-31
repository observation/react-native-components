import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ScalableImage from 'react-native-scalable-image'

import Lightbox from './Lightbox'
import { rounded, shadow } from '../styles'
import { Theme, useTheme } from '../theme'

type Props = {
  src: string
  alt?: string
}

const ContentImage = ({ src, alt }: Props) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const [photoIndex, setPhotoIndex] = React.useState<number>()
  if (!alt) {
    return <ScalableImage width={Dimensions.get('window').width - 2 * theme.margin.common} source={{ uri: src }} />
  }
  const [title, description] = alt.trim().split(/\s*\|\s*/)
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity testID="photo" onPress={() => setPhotoIndex(0)} activeOpacity={0.5}>
        <Lightbox
          photos={[src]}
          index={photoIndex}
          title={title}
          description={description}
          onClose={() => setPhotoIndex(undefined)}
        />
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
      </TouchableOpacity>
    </View>
  )
}

export default ContentImage

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    outerContainer: {
      margin: -theme.margin.common,
      marginBottom: -theme.margin.half,
      ...shadow.normal.ios,
    },
    innerContainer: {
      flexDirection: 'row',
      margin: theme.margin.common,
      backgroundColor: theme.color.white,
      ...shadow.normal.android,
      ...rounded.large,
      borderWidth: 1,
      borderColor: theme.color.grey50,
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
      color: theme.color.black,
      marginBottom: theme.margin.quarter,
    },
    description: {
      ...theme.font.small,
      color: theme.color.grey500,
    },
  })
