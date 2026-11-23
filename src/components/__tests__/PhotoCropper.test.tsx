import React, { useImperativeHandle } from 'react'
import { Platform, View } from 'react-native'

import { act, fireEvent, render } from '@testing-library/react-native'

import PhotoCropper, { type BaseProps, type CircleProps, type RectangleProps } from '../PhotoCropper'

const mockCropZoom = {
  crop: jest.fn(() => ({
    crop: { originX: 10, originY: 20, width: 300, height: 400 },
    context: { rotationAngle: 90 },
  })),
  getState: jest.fn(() => ({ scale: 1, translateX: 0, translateY: 0, rotate: 0 })),
  reset: jest.fn(),
  rotate: jest.fn(),
}

let mockCropZoomProps: any
jest.mock('react-native-zoom-toolkit', () => {
  const MockCropZoom = ({ ref, ...props }: any) => {
    useImperativeHandle(ref, () => mockCropZoom)
    mockCropZoomProps = props
    const { OverlayComponent, children } = props
    return (
      <View testID="crop-zoom">
        {OverlayComponent && <OverlayComponent />}
        {children}
      </View>
    )
  }
  return { CropZoom: MockCropZoom }
})

const labels = { cancel: 'Cancel', reset: 'Reset', confirm: 'Identify', original: 'Original', square: 'Square' }
const onCancel = jest.fn()
const onConfirm = jest.fn()

const renderCropper = (props: Partial<BaseProps> & (Partial<RectangleProps> | CircleProps) = {}) => {
  const result = render(
    <PhotoCropper
      uri="file:///path/to/photo.jpg"
      resolution={{ width: 4000, height: 3000 }}
      fixedAspectRatio={1}
      labels={labels}
      onCancel={onCancel}
      onConfirm={onConfirm}
      {...props}
    />,
  )
  // The crop area is only rendered once the size of the canvas is known
  act(() =>
    fireEvent(result.getByTestId('crop-canvas'), 'layout', { nativeEvent: { layout: { width: 400, height: 600 } } }),
  )
  return result
}

describe('PhotoCropper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Platform.OS = 'ios'
  })

  describe('Rendering', () => {
    test('Square crop area on iOS', () => {
      const { toJSON } = renderCropper()
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 368 })
      expect(mockCropZoomProps.resolution).toEqual({ width: 4000, height: 3000 })
      expect(toJSON()).toMatchSnapshot()
    })

    test('Circle crop area on Android', () => {
      Platform.OS = 'android'
      const { toJSON } = renderCropper({ fixedAspectRatio: 1, mask: 'circle' })
      expect(toJSON()).toMatchSnapshot()
    })

    test('A crop area that is wider than the canvas fits the width', () => {
      renderCropper({ fixedAspectRatio: 2 })
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 184 })
    })

    test('A crop area that is taller than the canvas fits the height', () => {
      renderCropper({ fixedAspectRatio: 0.5 })
      expect(mockCropZoomProps.cropSize).toEqual({ width: 284, height: 568 })
    })

    test('Without a fixed aspect ratio, the presets are shown and the original aspect ratio is selected', () => {
      const { getByText, toJSON } = renderCropper({ fixedAspectRatio: undefined })
      expect(getByText('Original')).toBeTruthy()
      expect(getByText('4:3')).toBeTruthy()
      expect(getByText('3:2')).toBeTruthy()
      expect(getByText('Square')).toBeTruthy()
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 276 })
      expect(toJSON()).toMatchSnapshot()
    })

    test('With a fixed aspect ratio, the presets are not shown', () => {
      const { queryByText, queryByTestId } = renderCropper()
      expect(queryByText('Original')).toBeNull()
      expect(queryByTestId('portrait-device')).toBeNull()
    })

    test('Busy', () => {
      const { getByTestId, queryByText } = renderCropper({ busy: true })
      expect(getByTestId('cropping')).toBeTruthy()
      expect(queryByText('Identify')).toBeNull()
    })
  })

  describe('Interaction', () => {
    test('Pressing confirm crops the photo', () => {
      // GIVEN
      const { getByText } = renderCropper()

      // WHEN
      fireEvent.press(getByText('Identify'))

      // THEN
      expect(onConfirm).toHaveBeenCalledWith({ originX: 10, originY: 20, width: 300, height: 400, rotation: 90 })
    })

    test('Pressing cancel', () => {
      // GIVEN
      const { getByText } = renderCropper()

      // WHEN
      fireEvent.press(getByText('Cancel'))

      // THEN
      expect(onCancel).toHaveBeenCalled()
    })

    test('Rotating enables reset, and reset disables it again', () => {
      // GIVEN
      const { getByTestId, getByText } = renderCropper()
      fireEvent.press(getByText('Reset'))
      expect(mockCropZoom.reset).not.toHaveBeenCalled()

      // WHEN
      fireEvent.press(getByTestId('rotate'))
      fireEvent.press(getByText('Reset'))

      // THEN
      expect(mockCropZoom.rotate).toHaveBeenCalled()
      expect(mockCropZoom.reset).toHaveBeenCalledTimes(1)
      fireEvent.press(getByText('Reset'))
      expect(mockCropZoom.reset).toHaveBeenCalledTimes(1)
    })

    test('Choosing a preset changes the crop area', () => {
      // GIVEN
      const { getByText } = renderCropper({ fixedAspectRatio: undefined })

      // WHEN
      fireEvent.press(getByText('3:2'))

      // THEN
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 245 })

      // WHEN
      fireEvent.press(getByText('Square'))

      // THEN
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 368 })
    })

    test('Switching to portrait changes the crop area and the preset labels', () => {
      // GIVEN
      const { getByTestId, getByText } = renderCropper({ fixedAspectRatio: undefined })
      fireEvent.press(getByText('4:3'))

      // WHEN
      fireEvent.press(getByTestId('portrait-device'))

      // THEN
      expect(getByText('3:4')).toBeTruthy()
      expect(getByText('2:3')).toBeTruthy()
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 491 })
    })

    test('Reset goes back to the original aspect ratio and orientation', () => {
      // GIVEN
      const { getByTestId, getByText } = renderCropper({ fixedAspectRatio: undefined })
      fireEvent.press(getByTestId('portrait-device'))
      fireEvent.press(getByText('3:4'))

      // WHEN
      fireEvent.press(getByText('Reset'))

      // THEN
      expect(mockCropZoom.reset).toHaveBeenCalled()
      expect(getByText('4:3')).toBeTruthy()
      expect(mockCropZoomProps.cropSize).toEqual({ width: 368, height: 276 })
    })

    test('Zooming or moving the photo enables reset', () => {
      // GIVEN
      const { getByText } = renderCropper()
      mockCropZoom.getState.mockReturnValue({ scale: 2, translateX: 0, translateY: 0, rotate: 0 })

      // WHEN
      act(() => mockCropZoomProps.onGestureEnd())
      fireEvent.press(getByText('Reset'))

      // THEN
      expect(mockCropZoom.reset).toHaveBeenCalled()
    })
  })
})
