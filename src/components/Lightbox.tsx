import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import ImageView from '@observation.org/react-native-image-viewing'
import Color from 'color'

import { IconClose } from './Icon'
import PageIndicator from './PageIndicator'
import font from '../styles/font'
import textStyle from '../styles/text'
import theme from '../styles/theme'

const getLightboxHeaderComponent =
  (numberOfPages: number, onClose: () => void) =>
  ({ imageIndex }: { imageIndex: number }) => {
    const hitSlop = { top: 16, left: 16, bottom: 16, right: 16 }
    return (
      <SafeAreaView style={styles.lightboxHeaderContainer}>
        <View style={styles.lightboxHeader}>
          <View style={{ flex: 1 }} />
          <View style={styles.pageIndicator}>
            <PageIndicator currentPage={imageIndex + 1} numberOfPages={numberOfPages} />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()} hitSlop={hitSlop}>
              <IconClose
                color={Color(theme.color.white).alpha(0.5).string()}
                size={theme.icon.size.extraExtraLarge}
                testID="close-lightbox"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

const getLightboxFooterComponent =
  (title?: string, description?: string, content?: React.ReactNode, style?: LightboxStyle) => () =>
    (
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
        </View>
      </SafeAreaView>
    )

type LightboxStyle = {
  descriptionTextStyle: TextStyle
}

type Props = {
  index?: number
  onClose: () => void
  photos: string[]
  title?: string
  description?: string
  content?: JSX.Element
  style?: LightboxStyle
}

const Lightbox = ({ index, onClose, photos, title, description, content, style }: Props) => (
  <ImageView
    images={photos.map((photo) => ({ uri: photo }))}
    imageIndex={index ?? 0}
    visible={index !== undefined}
    swipeToCloseEnabled={false}
    onRequestClose={onClose}
    HeaderComponent={getLightboxHeaderComponent(photos.length, onClose)}
    FooterComponent={getLightboxFooterComponent(title, description, content, style)}
  />
)

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
})
