import ImageResizer from '@bam.tech/react-native-image-resizer'
import FileSystem from 'react-native-fs'

import Log from './Log'
import type ImageFile from '../data/ImageFile'

const getTmpPath = (fileName: string) => {
  Log.debug('scaleImage:getTmpPath', fileName)

  return `${FileSystem.TemporaryDirectoryPath.replace(/\/$/, '')}/${fileName}`
}

const getFileUri = (path: string) => {
  Log.debug('scaleImage:getFileUri', path)

  return `file://${path.split('/').map(encodeURIComponent).join('/')}`
}

/**
 * Scales an image down to fit within the given size, as a JPEG without metadata. Smaller images keep their size.
 *
 * The scaled image is stored in the tmp directory, which the app is expected to clean. It is moved there, because
 * on iOS image-resizer only writes to the documents directory when given an output path.
 *
 * @param uri - The uri of the image to scale
 * @param maxSize - The maximum width and height
 * @param quality - The JPEG quality, from 0 to 100
 * @returns A promise that resolves to the uri and size of the scaled image
 */
const scaleImage = (uri: string, maxSize: number, quality: number): Promise<ImageFile> => {
  Log.debug('scaleImage', uri, maxSize)

  return ImageResizer.createResizedImage(uri, maxSize, maxSize, 'JPEG', quality, 0, undefined, false, {
    mode: 'contain',
    onlyScaleDown: true,
  }).then(({ path, name, width, height }) => {
    const destination = getTmpPath(name)
    return FileSystem.moveFile(path, destination).then(() => ({ uri: getFileUri(destination), width, height }))
  })
}

export default scaleImage
