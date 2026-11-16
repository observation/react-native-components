import React from 'react'
import { StyleSheet } from 'react-native'

import Svg, { Circle, Defs, Mask, Rect } from 'react-native-svg'

import Log from '../lib/Log'
import { useTheme } from '../theme'

type Size = {
  width: number
  height: number
}

type Props = {
  /** The size of the area the overlay is rendered in */
  outerRectangle: Size
  /** The size of the highlighted area in the center */
  innerRectangle: Size
  /** The shape of the highlighted area. A circle fits inside the inner rectangle. */
  shape?: 'rectangle' | 'circle'
}

/**
 * A semi-transparent overlay with a cutout in the center, highlighting the area that will be cropped.
 */
const CropMask = ({ outerRectangle, innerRectangle, shape = 'rectangle' }: Props) => {
  Log.trace('CropMask')

  const theme = useTheme()
  const horizontalMargin = (outerRectangle.width - innerRectangle.width) / 2
  const verticalMargin = (outerRectangle.height - innerRectangle.height) / 2

  const renderShape = (fill: string, stroke?: string) =>
    shape === 'circle' ? (
      <Circle
        cx={outerRectangle.width / 2}
        cy={outerRectangle.height / 2}
        r={Math.min(innerRectangle.width, innerRectangle.height) / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={StyleSheet.hairlineWidth}
      />
    ) : (
      <Rect
        x={horizontalMargin}
        y={verticalMargin}
        width={innerRectangle.width}
        height={innerRectangle.height}
        fill={fill}
        stroke={stroke}
        strokeWidth={StyleSheet.hairlineWidth}
      />
    )

  return (
    <Svg width={outerRectangle.width} height={outerRectangle.height}>
      <Defs>
        <Mask id="mask">
          <Rect width="100%" height="100%" fill="white" />
          {renderShape('black')}
        </Mask>
      </Defs>
      <Rect width="100%" height="100%" fill={theme.overlay.black50} mask="url(#mask)" />
      {renderShape('transparent', theme.color.border.system.staticWhite)}
    </Svg>
  )
}

export default CropMask
