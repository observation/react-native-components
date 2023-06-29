import React from 'react'
import { StyleSheet, View, Image, ViewStyle, ImageSourcePropType, StyleProp } from 'react-native'

type Props = {
  source: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  top?: number
  bottom?: number
  left?: number
  right?: number
  width?: number
  height?: number
}

/** Background image from local asset, with absolute positioning */
const BackgroundImage = ({ source, style, top, bottom, left, right, width, height }: Props) => (
  <View style={[{ position: 'absolute', top, bottom, left, right, width, height }, style]}>
    <Image style={styles.image} source={source} resizeMode="contain" />
  </View>
)

export default BackgroundImage

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
})
