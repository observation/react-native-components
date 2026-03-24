import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'

import ImageView from '@observation.org/react-native-image-viewing'
import Color from 'color'

import { Icon } from './Icon'
import PageIndicator from './PageIndicator'
import { Theme } from '../@types/theme'
import { font, layout } from '../styles'
import textStyle from '../styles/text'
import { useStyles, useTheme } from '../theme/ThemeProvider'

const hitSlop = { top: 16, left: 16, bottom: 16, right: 16 }

type getLightboxHeaderComponentParams = {
  theme: Theme
  styles: ReturnType<typeof createStyles>
  numberOfPages: number
  onClose: () => void
}

const getLightboxHeaderComponent =
  (params: getLightboxHeaderComponentParams) =>
  ({ imageIndex }: { imageIndex: number }) => {
    const { theme, styles, numberOfPages, onClose } = params
    return (
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
                size={theme.icon.size.xxl}
                testID="close-lightbox"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

type getLightboxFooterComponentParams = {
  theme: Theme
  styles: ReturnType<typeof createStyles>
  title?: string
  description?: string
  content?: React.ReactElement
  style?: LightboxStyle
  onPressDelete?: () => void
  onPressCrop?: () => void
}

const getLightboxFooterComponent = (params: getLightboxFooterComponentParams) => () => {
  const { theme, styles, title, description, content, style, onPressDelete, onPressCrop } = params
  return (
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
        {(onPressDelete || onPressCrop) && (
          <View style={styles.buttonsContainer}>
            {onPressDelete && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPressDelete} hitSlop={hitSlop}>
                  <Icon name="trash-alt" color={theme.color.white} size={20} testID="delete-photo" />
                </TouchableOpacity>
              </View>
            )}
            {onPressCrop && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPressCrop} hitSlop={hitSlop}>
                  <Icon name="crop-alt" color={theme.color.white} size={20} testID="crop-photo" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

type LightboxStyle = {
  descriptionTextStyle: TextStyle
}

type Props = {
  index?: number
  onClose: () => void
  onDelete?: (imageIndex: number) => void
  onCrop?: (imageIndex: number) => void
  editable?: (imageIndex: number) => boolean
  photos: string[]
  title?: string
  description?: string
  content?: (imageIndex?: number) => React.ReactElement | undefined
  style?: LightboxStyle
}

const Lightbox = ({
  index,
  onClose,
  onDelete,
  onCrop,
  editable,
  photos,
  title,
  description,
  content,
  style,
}: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  const initialImageIndex = index ?? 0
  const [currentImageIndex, setCurrentImageIndex] = useState<number>()

  const imageIndex = currentImageIndex ?? initialImageIndex
  const onPressDelete = onDelete ? () => onDelete(imageIndex) : undefined
  const onPressCrop = onCrop ? () => onCrop(imageIndex) : undefined
  const showCrop = editable ? editable(imageIndex) : true

  const ImageViewTypeErased = ImageView as unknown as any

  return (
    <ImageViewTypeErased
      images={photos.map((photo) => ({ uri: photo }))}
      imageIndex={initialImageIndex}
      visible={index !== undefined}
      swipeToCloseEnabled={false}
      onImageIndexChange={setCurrentImageIndex}
      onRequestClose={onClose}
      HeaderComponent={getLightboxHeaderComponent({
        theme,
        styles,
        numberOfPages: photos.length,
        onClose,
      })}
      FooterComponent={getLightboxFooterComponent({
        theme,
        styles,
        title,
        description,
        content: content?.(imageIndex),
        style,
        onPressDelete,
        onPressCrop: showCrop ? onPressCrop : undefined,
      })}
    />
  )
}

export default Lightbox

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    lightboxFooterContainer: {
      ...layout.absoluteBottom,
      backgroundColor: '#00000077',
    },
    lightboxHeaderContainer: {
      ...layout.absoluteTop,
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
      flex: 0.5,
      alignItems: 'center',
    },
  })
