/** The region of a photo to crop to, in pixels of the photo after rotating it */
type CropRegion = {
  originX: number
  originY: number
  width: number
  height: number
  /** Rotation in degrees, clockwise */
  rotation: number
}

export default CropRegion
