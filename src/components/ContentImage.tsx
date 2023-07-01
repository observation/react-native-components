import React from 'react'
import { Dimensions, TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native'

import ScalableImage from 'react-native-scalable-image'

import Lightbox from './Lightbox'
import font from '../styles/font'
import theme from '../styles/theme'

type Props = {
  src: string
  alt?: string
}

const ContentImage = ({ src, alt }: Props) => {
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

const styles = StyleSheet.create({
  outerContainer: {
    margin: -theme.margin.common,
    marginBottom: -theme.margin.half,
    ...theme.shadow.ios,
  },
  innerContainer: {
    flexDirection: 'row',
    margin: theme.margin.common,
    backgroundColor: theme.color.white,
    ...theme.shadow.android,
    ...theme.roundedLarge,
    borderWidth: 1,
    borderColor: theme.color.greyLight,
  },
  imageContainer: {
    margin: theme.margin.common,
    marginRight: theme.margin.half,
    ...theme.roundedLarge,
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
    ...font.smallBold,
    color: theme.color.black,
    marginBottom: theme.margin.quarter,
  },
  description: {
    ...font.small,
    color: theme.color.greyBase,
  },
})
