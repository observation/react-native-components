import RNPhotoManipulator, { FlipMode, RotationMode } from 'react-native-photo-manipulator'

import Log from './Log'
import type CropRegion from '../data/CropRegion'
import type ImageFile from '../data/ImageFile'

const getRotationMode = (rotation: number) => {
  Log.debug('cropImage:getRotationMode', rotation)

  switch (rotation) {
    case 90:
      return RotationMode.R90
    case 180:
      return RotationMode.R180
    case 270:
      return RotationMode.R270
  }
}

/**
 * Removes the EXIF orientation by applying it to the pixels, as the cropper doesn't support it.
 * Flipping twice gives the same image, without the orientation.
 */
const removeExifOrientation = (uri: string) => {
  Log.debug('cropImage:removeExifOrientation')

  return RNPhotoManipulator.flipImage(uri, FlipMode.Vertical).then((flippedUri) =>
    RNPhotoManipulator.flipImage(flippedUri, FlipMode.Vertical),
  )
}

/**
 * Crops the image to the given region, as returned by the `CropZoom` component of react-native-zoom-toolkit.
 *
 * @param uri - The uri of the image to crop
 * @param cropRegion - The region of the (rotated) image to crop to
 * @returns A promise that resolves to the uri and size of the cropped image
 */
const cropImage = (uri: string, cropRegion: CropRegion): Promise<ImageFile> => {
  Log.debug('cropImage', cropRegion)

  const { originX, originY, width, height, rotation } = cropRegion
  const rotationMode = getRotationMode(rotation)

  // Rotating also applies the EXIF orientation
  return (rotationMode ? RNPhotoManipulator.rotateImage(uri, rotationMode) : removeExifOrientation(uri))
    .then((newUri) => RNPhotoManipulator.crop(newUri, { x: originX, y: originY, width, height }))
    .then((croppedUri) => ({ uri: croppedUri, width, height }))
}

export default cropImage
