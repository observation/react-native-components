import React, { useState } from 'react'
import { Image, useWindowDimensions } from 'react-native'

import { fitContainer } from 'react-native-zoom-toolkit'

import Log from '../lib/Log'

type Props = {
  uri: string
}

const GalleryImage = ({ uri }: Props) => {
  Log.trace('GalleryImage')

  const { width, height } = useWindowDimensions()
  const [resolution, setResolution] = useState({ width: 1, height: 1 })

  const size = fitContainer(resolution.width / resolution.height, { width, height })

  return (
    <Image
      testID="image-gallery-image"
      source={{ uri }}
      style={size}
      resizeMethod="resize"
      resizeMode="cover"
      onLoad={({ nativeEvent: { source } }) => setResolution({ width: source.width, height: source.height })}
    />
  )
}

export default GalleryImage
