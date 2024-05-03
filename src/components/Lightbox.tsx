import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import ImageView from '@observation.org/react-native-image-viewing'
import Color from 'color'

import { Icon } from './Icon'
import IconButton from './IconButton'
import PageIndicator from './PageIndicator'
import font from '../styles/font'
import textStyle from '../styles/text'
import theme from '../styles/theme'

const hitSlop = { top: 16, left: 16, bottom: 16, right: 16 }

const getLightboxHeaderComponent =
  (numberOfPages: number, onClose: () => void) =>
  ({ imageIndex }: { imageIndex: number }) => (
    <SafeAreaView style={styles.lightboxHeaderContainer}>
      <View style={styles.lightboxHeader}>
        <View style={{ flex: 1 }} />
        <View style={styles.pageIndicator}>
          <PageIndicator currentPage={imageIndex + 1} numberOfPages={numberOfPages} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.closeButton} onPress={() => onClose()} hitSlop={hitSlop}>
            <Icon
              name="times"
              color={Color(theme.color.white).alpha(0.5).string()}
              size={theme.icon.size.extraExtraLarge}
              testID="close-lightbox"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )

const getLightboxFooterComponent =
  (
    title?: string,
    description?: string,
    content?: React.ReactNode,
    style?: LightboxStyle,
    onPressDelete?: () => void,
  ) =>
  () => (
    <SafeAreaView style={styles.lightboxFooterContainer}>
      <View style={styles.lightboxFooter}>
        {title && (
          <View style={styles.footerItem}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        {description && (
          <View style={styles.footerItem}>
            <Text style={[styles.description, style?.descriptionTextStyle]}>{description}</Text>
          </View>
        )}
        {content && <View style={styles.footerItem}>{content}</View>}
        {onPressDelete && (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onPressDelete} hitSlop={hitSlop}>
                <IconButton testID="delete-photo" icon={{ name: 'trash-alt', size: 20, color: theme.color.white }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )

type LightboxStyle = {
  descriptionTextStyle: TextStyle
}

type Props = {
  index?: number
  onClose: () => void
  onDelete?: (imageIndex: number) => void
  photos: string[]
  title?: string
  description?: string
  content?: JSX.Element
  style?: LightboxStyle
}

const Lightbox = ({ index, onClose, onDelete, photos, title, description, content, style }: Props) => {
  const [imageIndexAfterSwipe, setImageIndexAfterSwipe] = useState<number>()

  const imageIndex = index ?? 0

  const onPressDelete = onDelete ? () => onDelete(imageIndexAfterSwipe ?? imageIndex) : undefined

  return (
    <ImageView
      images={photos.map((photo) => ({ uri: photo }))}
      imageIndex={imageIndex}
      visible={index !== undefined}
      swipeToCloseEnabled={false}
      onImageIndexChange={setImageIndexAfterSwipe}
      onRequestClose={onClose}
      HeaderComponent={getLightboxHeaderComponent(photos.length, onClose)}
      FooterComponent={getLightboxFooterComponent(title, description, content, style, onPressDelete)}
    />
  )
}

export default Lightbox

const styles = StyleSheet.create({
  lightboxFooterContainer: {
    ...theme.absoluteBottom,
    backgroundColor: '#00000077',
  },
  lightboxHeaderContainer: {
    ...theme.absoluteTop,
    backgroundColor: '#00000077',
  },
  lightboxHeader: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: theme.margin.common,
  },
  lightboxFooter: {
    paddingHorizontal: theme.margin.common,
    paddingVertical: theme.margin.half,
  },
  pageIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  footerItem: {
    marginVertical: theme.margin.quarter,
  },
  title: {
    ...font.largeBold,
    lineHeight: 24,
    color: 'white',
  },
  description: {
    ...textStyle.body,
    color: theme.color.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: theme.margin.large,
    marginHorizontal: theme.margin.common,
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
  },
})
