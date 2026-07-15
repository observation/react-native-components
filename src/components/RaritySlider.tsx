import React, { useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

import CapitalizeText from './CapitalizeText'
import { Icon } from './Icon'
import Rarity from '../data/Rarity'
import Config from '../lib/Config'
import Log from '../lib/Log'
import { font } from '../styles'
import { layout } from '../styles/layout'
import { Theme, useStyles, useTheme } from '../theme'

const minimumOpacity = 0.33
const clickSpringConfig = {
  stiffness: 120,
  damping: 20,
  mass: 1,
}

type Props = {
  rarities: Rarity[]
  onChange: (rarity: Rarity) => void
  value: Rarity | undefined
}

const margin = 40 // horizontal margin for the slider to prevent triggering gestures on screen edges
const handleWidth = 24

const RaritySlider = ({ rarities, onChange, value }: Props) => {
  Log.debug('RaritySlider:render', { value })

  const theme = useTheme()
  const styles = useStyles(createStyles)

  const { width } = useWindowDimensions()

  const options = useMemo(() => rarities.filter((r) => r.id !== Config.rarityId.unknown), [rarities])
  const rarityWidth = (width - margin * 2) / options.length
  const rarityConfig = Config.rarityConfig(theme)

  const getOffsetForRarity = useCallback(
    (rarity: Rarity | undefined) =>
      margin + rarityWidth * options.findIndex((r) => r.id === (rarity?.id ?? Config.rarityId.common)),
    [rarityWidth, options],
  )
  const offset = useSharedValue(getOffsetForRarity(value))

  useEffect(() => {
    Log.debug('RaritySlider:useEffect value changed', { value })

    const newOffset = getOffsetForRarity(value)
    offset.value = withSpring(newOffset, clickSpringConfig)
  }, [getOffsetForRarity, offset, value])

  const snapPoints = useMemo(() => options.map((rarity) => getOffsetForRarity(rarity)), [getOffsetForRarity, options])

  const onPressRarity = (index: number) => {
    Log.debug('RaritySlider:onPressRarity')

    offset.value = withSpring(snapPoints[index], clickSpringConfig)

    onChange(options[index])
  }

  const derivedValues = [
    useDerivedValue(() => interpolate(offset.value, [snapPoints[0], snapPoints[1]], [1, 0], 'clamp')),
    useDerivedValue(() => interpolate(offset.value, [snapPoints[1], snapPoints[2]], [1, 0], 'clamp')),
    useDerivedValue(() => interpolate(offset.value, [snapPoints[2], snapPoints[3]], [1, 0], 'clamp')),
  ]

  const bottomLineStyles = [
    useAnimatedStyle(() => ({ height: 2 + derivedValues[0].value * 6 })),
    useAnimatedStyle(() => ({ height: 2 + derivedValues[1].value * 6 })),
    useAnimatedStyle(() => ({ height: 2 + derivedValues[2].value * 6 })),
    {},
  ]

  const opacities = [
    useAnimatedStyle(() => ({ opacity: minimumOpacity + derivedValues[0].value * (1 - minimumOpacity) })),
    useAnimatedStyle(() => ({ opacity: minimumOpacity + derivedValues[1].value * (1 - minimumOpacity) })),
    useAnimatedStyle(() => ({ opacity: minimumOpacity + derivedValues[2].value * (1 - minimumOpacity) })),
    {},
  ]

  const onEndPan = () => {
    Log.debug('RaritySlider:onEndPan')

    const index = snapPoints.reduce((closestIdx, point, i) => {
      const currentDistance = Math.abs(offset.value - point)
      const closestDistance = Math.abs(offset.value - snapPoints[closestIdx])
      return currentDistance < closestDistance ? i : closestIdx
    }, 0)

    offset.value = withSpring(snapPoints[index], clickSpringConfig)
    onChange(options[index])
  }

  const pan = Gesture.Pan()
    .hitSlop(layout.hitSlop)
    .onChange((event) => (offset.value = Math.min(Math.max(event.absoluteX, margin), width - margin)))
    .onEnd(() => scheduleOnRN(onEndPan))

  const sliderStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value - handleWidth / 2 }] }))

  return (
    <View>
      <View style={styles.raritiesContainer}>
        {options.map(({ id, name }, index) => (
          <Animated.View key={id} style={[styles.rarityContainer, opacities[index]]}>
            <TouchableOpacity style={styles.rarity} onPress={() => onPressRarity(index)} hitSlop={layout.hitSlop}>
              <Icon
                style="solid"
                name={rarityConfig[id].iconName}
                size={theme.icon.size.m}
                color={rarityConfig[id].color}
              />
              <View style={styles.rarityTextContainer}>
                <CapitalizeText style={styles.rarityText}>{name}</CapitalizeText>
              </View>
              <View style={styles.bottomLineContainer}>
                <Animated.View
                  style={[styles.bottomLine, { backgroundColor: rarityConfig[id].color }, bottomLineStyles[index]]}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <View style={styles.sliderContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, sliderStyle]} />
        </GestureDetector>
      </View>
    </View>
  )
}

export default RaritySlider

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    raritiesContainer: {
      paddingTop: theme.margin.half,
      paddingHorizontal: margin,
      paddingVertical: theme.margin.common,
      flexDirection: 'row',
      width: '100%',
    },
    rarityContainer: {
      width: '25%',
      paddingHorizontal: 0.5,
    },
    rarity: {
      flexGrow: 1,
      alignItems: 'center',
      gap: 6,
      width: '100%',
    },
    rarityTextContainer: {
      flexGrow: 1,
    },
    rarityText: {
      ...font.small,
      lineHeight: 14,
      includeFontPadding: false,
      textAlign: 'center',
      color: theme.color.text.system.subtle,
    },
    bottomLineContainer: {
      width: '100%',
      height: 8,
      marginTop: 2,
      justifyContent: 'center',
    },
    bottomLine: {
      height: 8,
      borderRadius: 8,
    },
    sliderContainer: {
      position: 'absolute',
      height: handleWidth,
      bottom: theme.margin.half,
      left: 0,
      right: 0,
    },
    sliderHandle: {
      position: 'absolute',
      height: handleWidth,
      width: handleWidth,
      backgroundColor: theme.color.background.system.disabled,
      borderRadius: handleWidth / 2,
      borderColor: theme.color.border.system.inverse,
      borderWidth: 2,
    },
  })
  return styles
}
