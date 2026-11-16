import ImageResizer, { Response } from '@bam.tech/react-native-image-resizer'

ImageResizer.createResizedImage = jest.fn((uri: string) => {
  const path = uri.replace(/^file:\/\//, '/tmp')
  const scaledPath = path.replace(/\.jpg$/, '-scaled.jpg')
  const scaledResponse: Response = {
    size: 1000,
    width: 1000,
    height: 750,
    uri: `file://${scaledPath}`,
    path: scaledPath,
    name: scaledPath.replace(/^.*\//, ''),
  }
  return Promise.resolve(scaledResponse)
})

export default ImageResizer
