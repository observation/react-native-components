import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

import Color from 'color'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gallery, type GalleryRefType, stackTransition } from 'react-native-zoom-toolkit'

import GalleryImage from './GalleryImage'
import IconButton from './IconButton'
import PageIndicator from './PageIndicator'
import Log from '../lib/Log'
import { layout } from '../styles'
import { type Theme, useStyles, useTheme } from '../theme'

type Props = {
  /** Uris of the photos to show */
  photos: string[]
  /** Index of the photo that is shown. Changing it scrolls the gallery to that photo. */
  currentIndex: number
  /** Called when the user swipes to another photo */
  onIndexChange: (index: number) => void
  /** Called when the user presses the close button */
  onClose: () => void
  /** Renders content below the photo, e.g. a title and description, for the photo with the given index */
  renderFooter?: (index: number) => React.ReactNode
  /** Shows a delete button. Called with the index of the current photo when it is pressed. */
  onDelete?: (index: number) => void
  /** Shows a crop button. Called with the index of the current photo when it is pressed. */
  onCrop?: (index: number) => void
}

/**
 * Shows photos full screen, with zooming and swiping between photos.
 *
 * This is a controlled component: the parent owns the current index.
 */
const PhotoGallery = ({ photos, currentIndex, onIndexChange, onClose, renderFooter, onDelete, onCrop }: Props) => {
  Log.debug('PhotoGallery')

  const theme = useTheme()
  const styles = useStyles(createStyles)
  const insets = useSafeAreaInsets()
  const galleryRef = useRef<GalleryRefType>(null)
  // The index the gallery shows, to tell a swipe apart from a change by the parent
  const galleryIndexRef = useRef(currentIndex)

  useEffect(() => {
    if (currentIndex !== galleryIndexRef.current) {
      Log.debug('PhotoGallery:setIndex', currentIndex)

      galleryIndexRef.current = currentIndex
      galleryRef.current?.setIndex(currentIndex)
    }
  }, [currentIndex])

  const renderItem = useCallback((uri: string) => <GalleryImage uri={uri} />, [])

  const keyExtractor = useCallback((uri: string, index: number) => `${index}-${uri}`, [])

  const onChangeIndex = (index: number) => {
    Log.debug('PhotoGallery:onChangeIndex', index)

    galleryIndexRef.current = index
    if (index !== currentIndex) {
      onIndexChange(index)
    }
  }

  if (currentIndex < 0 || currentIndex >= photos.length) return null

  const footer = renderFooter?.(currentIndex)
  const hasActions = !!onDelete || !!onCrop
  const actionIconColor = theme.color.icon.system.staticWhite

  return (
    <View style={styles.container}>
      <Gallery
        ref={galleryRef}
        data={photos}
        initialIndex={currentIndex}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        customTransition={stackTransition}
        onIndexChange={onChangeIndex}
      />

      <View style={[styles.header, { paddingTop: insets.top + theme.margin.common }]}>
        <View style={styles.headerSide} />
        <View style={styles.pageIndicator}>
          <PageIndicator currentPage={currentIndex + 1} numberOfPages={photos.length} />
        </View>
        <View style={styles.headerSide}>
          <IconButton
            containerStyle={styles.closeButton}
            onPress={onClose}
            hitSlop={layout.hitSlop}
            testID="close"
            icon={{
              name: 'times',
              color: Color(theme.color.icon.system.staticWhite).alpha(0.5).string(),
              size: theme.icon.size.xxl,
            }}
          />
        </View>
      </View>

      {(!!footer || hasActions) && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + theme.margin.half }]}>
          {footer}
          {hasActions && (
            <View style={styles.actions}>
              <View style={styles.action}>
                {!!onDelete && (
                  <IconButton
                    onPress={() => onDelete(currentIndex)}
                    hitSlop={layout.hitSlop}
                    testID="delete-photo"
                    icon={{ name: 'trash-alt', color: actionIconColor, size: theme.icon.size.xl }}
                  />
                )}
              </View>
              <View style={styles.action}>
                {!!onCrop && (
                  <IconButton
                    onPress={() => onCrop(currentIndex)}
                    hitSlop={layout.hitSlop}
                    testID="crop-photo"
                    icon={{ name: 'crop-alt', color: actionIconColor, size: theme.icon.size.xl }}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default PhotoGallery

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.background.system.staticBlack,
    },
    header: {
      ...layout.absoluteTop,
      flexDirection: 'row',
      paddingHorizontal: theme.margin.common,
      paddingBottom: theme.margin.common,
      backgroundColor: theme.overlay.black50,
    },
    headerSide: {
      flex: 1,
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
    footer: {
      ...layout.absoluteBottom,
      paddingHorizontal: theme.margin.common,
      paddingTop: theme.margin.half,
      backgroundColor: theme.overlay.black50,
    },
    actions: {
      flexDirection: 'row',
      marginVertical: theme.margin.large,
      marginHorizontal: theme.margin.common,
    },
    action: {
      flex: 1,
      alignItems: 'center',
    },
  })
  return styles
}
