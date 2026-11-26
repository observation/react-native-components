import React, { useRef, useState } from 'react'
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CropZoom, CropZoomRefType } from 'react-native-zoom-toolkit'

import CropMask from './CropMask'
import { Icon } from './Icon'
import type CropRegion from '../data/CropRegion'
import Log from '../lib/Log'
import { layout } from '../styles'
import { type Theme, useStyles, useTheme } from '../theme'

type Size = {
  width: number
  height: number
}

type AspectRatioPreset = 'original' | '4:3' | '3:2' | 'square'
type Orientation = 'landscape' | 'portrait'

export type BaseProps = {
  /** Uri of the photo to crop */
  uri: string
  /** Size of the photo in pixels, with the EXIF orientation applied */
  resolution: Size
  labels: {
    cancel: string
    reset: string
    confirm: string
    original: string
    square: string
  }
  /** Shows a spinner instead of the confirm button, e.g. while cropping */
  busy?: boolean
  onCancel: () => void
  /** Called with the region of the photo to crop to */
  onConfirm: (cropRegion: CropRegion) => void
}

export type RectangleProps = {
  /**
   * Width divided by height of the crop area, which the user can't change.
   * Without it, the user can choose an aspect ratio preset and the orientation.
   */
  fixedAspectRatio?: number
  /** The shape of the crop area */
  mask?: 'rectangle'
}

export type CircleProps = {
  /** A circle always has a fixed aspect ratio of 1 */
  fixedAspectRatio: 1
  /** The shape of the crop area */
  mask: 'circle'
}

type Props = BaseProps & (RectangleProps | CircleProps)

const PhotoCropper = ({
  uri,
  resolution,
  fixedAspectRatio,
  mask,
  labels,
  busy = false,
  onCancel,
  onConfirm,
}: Props) => {
  Log.debug('PhotoCropper')

  const theme = useTheme()
  const styles = useStyles(createStyles)
  const insets = useSafeAreaInsets()
  const cropZoomRef = useRef<CropZoomRefType>(null)

  // The size of the area the photo is shown in, known after the first layout
  const [canvas, setCanvas] = useState<Size>({ width: 0, height: 0 })
  const [hasChanges, setHasChanges] = useState(false)

  const originalAspectRatio = resolution.width / resolution.height
  const originalOrientation: Orientation = originalAspectRatio > 1 ? 'landscape' : 'portrait'
  const [orientation, setOrientation] = useState<Orientation>(originalOrientation)
  const [aspectRatioPreset, setAspectRatioPreset] = useState<AspectRatioPreset>('original')
  const showPresets = fixedAspectRatio === undefined

  const aspectRatio = (() => {
    if (fixedAspectRatio !== undefined) return fixedAspectRatio

    switch (aspectRatioPreset) {
      case 'original':
        return orientation === 'landscape'
          ? Math.max(originalAspectRatio, 1 / originalAspectRatio)
          : Math.min(originalAspectRatio, 1 / originalAspectRatio)
      case '4:3':
        return orientation === 'landscape' ? 4 / 3 : 3 / 4
      case '3:2':
        return orientation === 'landscape' ? 3 / 2 : 2 / 3
      case 'square':
        return 1
    }
  })()

  const isResetActive = hasChanges || (showPresets && aspectRatio !== originalAspectRatio)

  const cropSize = (() => {
    const maxWidth = canvas.width - 2 * theme.margin.common
    const maxHeight = canvas.height - 2 * theme.margin.common
    return aspectRatio >= maxWidth / maxHeight
      ? { width: Math.round(maxWidth), height: Math.round(maxWidth / aspectRatio) }
      : { width: Math.round(maxHeight * aspectRatio), height: Math.round(maxHeight) }
  })()

  const onReset = () => {
    Log.debug('PhotoCropper:onReset')

    cropZoomRef.current?.reset()
    setAspectRatioPreset('original')
    setOrientation(originalOrientation)
    setHasChanges(false)
  }

  const onChangeOrientation = (newOrientation: Orientation) => {
    Log.debug('PhotoCropper:onChangeOrientation', newOrientation)

    setOrientation(newOrientation)
  }

  const onChangeAspectRatioPreset = (preset: AspectRatioPreset) => {
    Log.debug('PhotoCropper:onChangeAspectRatioPreset', preset)

    setAspectRatioPreset(preset)
  }

  const onRotate = () => {
    Log.debug('PhotoCropper:onRotate')

    cropZoomRef.current?.rotate()
    setHasChanges(true)
  }

  const onPressConfirm = () => {
    Log.debug('PhotoCropper:onPressConfirm')

    const cropZoomState = cropZoomRef.current?.crop()
    if (cropZoomState === undefined) return

    const { originX, originY, width, height } = cropZoomState.crop
    onConfirm({ originX, originY, width, height, rotation: cropZoomState.context.rotationAngle })
  }

  const checkForPinchOrPanChanges = () => {
    Log.debug('PhotoCropper:checkForPinchOrPanChanges')

    const cropZoomState = cropZoomRef.current?.getState()
    if (cropZoomState === undefined) return

    const { translateX, translateY, rotate } = cropZoomState
    setHasChanges(cropZoomState.scale !== 1 || translateX !== 0 || translateY !== 0 || rotate !== 0)
  }

  const cropMask = () => <CropMask innerRectangle={cropSize} outerRectangle={canvas} shape={mask} />

  const renderPreset = (preset: AspectRatioPreset, label: string) => {
    Log.trace('PhotoCropper:renderPreset', preset)

    const selected = preset === 'square' ? aspectRatio === 1 : aspectRatioPreset === preset
    return (
      <TouchableOpacity onPress={() => onChangeAspectRatioPreset(preset)} hitSlop={layout.hitSlop}>
        <Text style={selected ? styles.selectedAspectRatio : styles.aspectRatioText}>{label}</Text>
      </TouchableOpacity>
    )
  }

  const renderPresets = () => {
    Log.trace('PhotoCropper:renderPresets')

    return (
      <>
        <View style={styles.orientationContainer}>
          <View style={styles.smallDevicesContainer}>
            <TouchableOpacity
              style={[styles.landscapeDevice, aspectRatioPreset === 'square' ? styles.disabledSmallDevice : undefined]}
              disabled={aspectRatio >= 1}
              onPress={() => onChangeOrientation('landscape')}
              hitSlop={layout.hitSlop}
              testID="landscape-device"
            >
              {orientation === 'landscape' && aspectRatioPreset !== 'square' && (
                <View style={styles.checkIconContainer}>
                  <Icon name="check" size={theme.icon.size.xs} color={theme.color.icon.system.staticWhite} />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.portraitDevice, aspectRatioPreset === 'square' ? styles.disabledSmallDevice : undefined]}
              disabled={aspectRatio <= 1}
              onPress={() => onChangeOrientation('portrait')}
              hitSlop={layout.hitSlop}
              testID="portrait-device"
            >
              {orientation === 'portrait' && aspectRatioPreset !== 'square' && (
                <View style={styles.checkIconContainer}>
                  <Icon name="check" size={theme.icon.size.xs} color={theme.color.icon.system.staticWhite} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aspectRatioPresetsContainer}>
          {renderPreset('original', labels.original)}
          {renderPreset('4:3', orientation === 'landscape' ? '4:3' : '3:4')}
          {renderPreset('3:2', orientation === 'landscape' ? '3:2' : '2:3')}
          {renderPreset('square', labels.square)}
        </View>
      </>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {showPresets && renderPresets()}
      <View
        style={styles.canvas}
        onLayout={({ nativeEvent: { layout: canvasLayout } }) =>
          setCanvas({ width: canvasLayout.width, height: canvasLayout.height })
        }
        testID="crop-canvas"
      >
        {canvas.height > 0 && (
          <CropZoom
            ref={cropZoomRef}
            cropSize={cropSize}
            resolution={resolution}
            OverlayComponent={cropMask}
            onGestureEnd={checkForPinchOrPanChanges}
          >
            {Platform.OS === 'ios' ? (
              <FastImage source={{ uri }} style={styles.image} />
            ) : (
              <Image source={{ uri }} style={styles.image} resizeMethod="resize" />
            )}
          </CropZoom>
        )}
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom + theme.margin.common }]}>
        <TouchableOpacity onPress={onCancel} disabled={busy} hitSlop={layout.hitSlop}>
          <Text style={styles.actionText}>{labels.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReset} disabled={busy || !isResetActive} hitSlop={layout.hitSlop}>
          <Text style={isResetActive ? styles.actionText : styles.disabledActionText}>{labels.reset}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRotate} disabled={busy} hitSlop={layout.hitSlop} testID="rotate">
          <View style={styles.rotateIcon}>
            <Icon name="arrow-turn-right" size={12} color={theme.color.icon.system.staticWhite} />
            <View style={styles.rotateIconSquare}>
              <Icon name="square" style="solid" size={12} color={theme.color.icon.system.staticWhite} />
            </View>
          </View>
        </TouchableOpacity>
        {busy ? (
          <ActivityIndicator color={theme.color.icon.system.staticWhite} testID="cropping" />
        ) : (
          <TouchableOpacity onPress={onPressConfirm} hitSlop={layout.hitSlop}>
            <Text style={styles.confirmText}>{labels.confirm}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default PhotoCropper

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.background.system.surfacePopped,
    },
    canvas: {
      flex: 1,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.margin.common,
      paddingTop: theme.margin.common,
      minHeight: 48,
      backgroundColor: theme.overlay.white05,
    },
    orientationContainer: {
      paddingTop: 16,
      alignItems: 'center',
      height: 48,
      backgroundColor: theme.overlay.white05,
    },
    smallDevicesContainer: {
      flexDirection: 'row',
      height: 21,
      width: 61,
      gap: theme.margin.large,
      alignItems: 'flex-end',
    },
    landscapeDevice: {
      borderWidth: 1,
      backgroundColor: theme.color.icon.system.subtle,
      borderColor: theme.color.border.system.subtler,
      borderRadius: 2,
      height: 16,
      width: 21,
      justifyContent: 'center',
      alignItems: 'center',
    },
    portraitDevice: {
      borderWidth: 1,
      backgroundColor: theme.color.icon.system.subtle,
      borderColor: theme.color.border.system.subtler,
      borderRadius: 2,
      height: 21,
      width: 16,
      alignItems: 'center',
      flexDirection: 'column-reverse',
    },
    checkIconContainer: {
      height: theme.fontSize.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledSmallDevice: {
      borderColor: theme.color.icon.system.subtle,
      backgroundColor: theme.overlay.white10,
    },
    aspectRatioPresetsContainer: {
      flexDirection: 'row',
      paddingHorizontal: theme.margin.common,
      paddingVertical: 14,
      justifyContent: 'space-between',
      backgroundColor: theme.overlay.white05,
    },
    selectedAspectRatio: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
    },
    aspectRatioText: {
      ...theme.font.medium,
      color: theme.color.text.system.subtler,
    },
    rotateIcon: {
      height: 19,
      justifyContent: 'space-between',
    },
    rotateIconSquare: {
      marginLeft: 5,
    },
    actionText: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
    },
    disabledActionText: {
      ...theme.font.medium,
      color: theme.color.text.system.subtler,
    },
    confirmText: {
      ...theme.text.body,
      color: theme.color.text.system.speciesStrong,
    },
  })
  return styles
}
