export const FlipMode = {
  Both: 'Both',
  Horizontal: 'Horizontal',
  Vertical: 'Vertical',
}

export const RotationMode = {
  R90: 'R90',
  R180: 'R180',
  R270: 'R270',
}

export default {
  flipImage: jest.fn().mockImplementation(() => Promise.resolve('file:///path/to/flipped-photo.jpg')),
  rotateImage: jest.fn().mockImplementation(() => Promise.resolve('file:///path/to/rotated-photo.jpg')),
  crop: jest.fn().mockImplementation(() => Promise.resolve('file:///path/to/cropped-photo.jpg')),
}
