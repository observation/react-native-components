/** An image stored as a local file, e.g. the result of cropping or scaling a photo */
type ImageFile = {
  uri: string
  width: number
  height: number
}

export default ImageFile
