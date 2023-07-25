import React, { useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'

import Lightbox from './Lightbox'
import theme from '../styles/theme'

type Props = {
  width: number
  photos: string[]
  title?: string
  description?: string
  content?: JSX.Element
}

/**
 * Component that renders photos in a strip
 *
 * Photos are sized so that four fit within the given width. When there are
 * more photos, they can be horizontally scrolled. Clicking on a photo shows
 * the photo enlarged in a modal lightbox view.
 */
const PhotoStrip = ({ width, photos, title, description, content }: Props) => {
  const [photoIndex, setPhotoIndex] = useState<number>()
  const innerMargin = photos.length > 4 ? theme.margin.eighth : theme.margin.quarter
  const photoSize = (width - 3 * theme.margin.half) / 4

  const photoMarginLeft = (index: number) => (index === 0 ? theme.margin.common : innerMargin)
  const photoMarginRight = (index: number) => (index === photos.length - 1 ? theme.margin.common : innerMargin)

  return (
    <View>
      <Lightbox
        index={photoIndex}
        onClose={() => setPhotoIndex(undefined)}
        photos={photos}
        title={title}
        description={description}
        content={content}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={photos}
        renderItem={({ item, index }) => (
          <TouchableOpacity testID="touchable-opacity" onPress={() => setPhotoIndex(index)} activeOpacity={0.8}>
            <Image
              source={{ uri: item! }}
              style={{
                ...theme.roundedLarge,
                width: photoSize,
                height: photoSize,
                marginLeft: photoMarginLeft(index),
                marginRight: photoMarginRight(index),
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${index}`}
        style={{ height: photoSize }}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'stretch' }}
      />
    </View>
  )
}

export default PhotoStrip
