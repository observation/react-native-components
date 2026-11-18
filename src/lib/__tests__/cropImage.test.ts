import RNPhotoManipulator, { FlipMode, RotationMode } from 'react-native-photo-manipulator'

import cropImage from '../cropImage'

const uri = 'file:///path/to/photo.jpg'
const region = { originX: 10, originY: 20, width: 300, height: 400 }

describe('cropImage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Without rotation, the EXIF orientation is removed before cropping', async () => {
    // WHEN
    const croppedImage = await cropImage(uri, { ...region, rotation: 0 })

    // THEN
    expect(RNPhotoManipulator.flipImage).toHaveBeenNthCalledWith(1, uri, FlipMode.Vertical)
    expect(RNPhotoManipulator.flipImage).toHaveBeenNthCalledWith(
      2,
      'file:///path/to/flipped-photo.jpg',
      FlipMode.Vertical,
    )
    expect(RNPhotoManipulator.rotateImage).not.toHaveBeenCalled()
    expect(RNPhotoManipulator.crop).toHaveBeenCalledWith('file:///path/to/flipped-photo.jpg', {
      x: 10,
      y: 20,
      width: 300,
      height: 400,
    })
    expect(croppedImage).toEqual({ uri: 'file:///path/to/cropped-photo.jpg', width: 300, height: 400 })
  })

  test.each([
    [90, RotationMode.R90],
    [180, RotationMode.R180],
    [270, RotationMode.R270],
  ])('With a rotation of %i degrees, the photo is rotated before cropping', async (rotation, rotationMode) => {
    // WHEN
    const croppedImage = await cropImage(uri, { ...region, rotation })

    // THEN
    expect(RNPhotoManipulator.rotateImage).toHaveBeenCalledWith(uri, rotationMode)
    expect(RNPhotoManipulator.flipImage).not.toHaveBeenCalled()
    expect(RNPhotoManipulator.crop).toHaveBeenCalledWith('file:///path/to/rotated-photo.jpg', {
      x: 10,
      y: 20,
      width: 300,
      height: 400,
    })
    expect(croppedImage).toEqual({ uri: 'file:///path/to/cropped-photo.jpg', width: 300, height: 400 })
  })
})
