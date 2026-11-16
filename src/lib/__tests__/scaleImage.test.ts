import ImageResizer from '@bam.tech/react-native-image-resizer'
import FileSystem from 'react-native-fs'

import scaleImage from '../scaleImage'

describe('scaleImage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('The image is scaled down and moved to the tmp directory', async () => {
    // WHEN
    const scaledImage = await scaleImage('file:///path/to/photo.jpg', 1000, 90)

    // THEN
    expect(ImageResizer.createResizedImage).toHaveBeenCalledWith(
      'file:///path/to/photo.jpg',
      1000,
      1000,
      'JPEG',
      90,
      0,
      undefined,
      false,
      { mode: 'contain', onlyScaleDown: true },
    )
    expect(FileSystem.moveFile).toHaveBeenCalledWith('/tmp/path/to/photo-scaled.jpg', '/tmp/photo-scaled.jpg')
    expect(scaledImage).toEqual({ uri: 'file:///tmp/photo-scaled.jpg', width: 1000, height: 750 })
  })

  test('A tmp directory ending in a slash gives a single slash in the path', async () => {
    // GIVEN
    const replaced = jest.replaceProperty(FileSystem, 'TemporaryDirectoryPath', '/tmp/')

    // WHEN
    const scaledImage = await scaleImage('file:///path/to/my photo.jpg', 1000, 90)

    // THEN
    expect(FileSystem.moveFile).toHaveBeenCalledWith('/tmp/path/to/my photo-scaled.jpg', '/tmp/my photo-scaled.jpg')
    expect(scaledImage.uri).toBe('file:///tmp/my%20photo-scaled.jpg')
    replaced.restore()
  })

  test('An error while scaling is passed on', async () => {
    // GIVEN
    jest.mocked(ImageResizer.createResizedImage).mockRejectedValueOnce(new Error('some error'))

    // WHEN
    const result = scaleImage('file:///path/to/photo.jpg', 1000, 90)

    // THEN
    await expect(result).rejects.toThrow('some error')
    expect(FileSystem.moveFile).not.toHaveBeenCalled()
  })
})
