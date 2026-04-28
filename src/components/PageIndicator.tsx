import React from 'react'
import { StyleSheet, View } from 'react-native'

import Log from '../lib/Log'
import { rounded } from '../styles'
import { Theme, useStyles } from '../theme'

/** Maximum number of dots to display, should be odd */
const maximumNumberOfDots = 7

type Dot = 'small' | 'large' | 'current'

type Props = {
  currentPage: number
  numberOfPages: number
}

const PageIndicator = ({ currentPage, numberOfPages }: Props) => {
  Log.debug('PageIndicator', currentPage, numberOfPages)

  const styles = useStyles(createStyles)
  const getIndicators = () => {
    Log.debug('PageIndicator:getIndicators')

    if (numberOfPages <= 1) return []

    const numberOfDots = Math.min(numberOfPages, maximumNumberOfDots)
    const middleDot = (maximumNumberOfDots + 1) / 2
    const hasOverflowDots = numberOfPages > maximumNumberOfDots
    const hasLeftOverflowDot = hasOverflowDots && currentPage > middleDot
    const hasRightOverflowDot = hasOverflowDots && currentPage <= numberOfPages - middleDot
    const currentDot = (() => {
      Log.debug('PageIndicator:getIndicators')

      if (hasLeftOverflowDot && hasRightOverflowDot) return middleDot - 1
      if (hasLeftOverflowDot) return maximumNumberOfDots - 1 - (numberOfPages - currentPage)
      return currentPage - 1
    })()

    const indicators: Dot[] = Array(numberOfDots).fill('large')
    indicators[currentDot] = 'current'
    if (hasLeftOverflowDot) {
      indicators[0] = 'small'
    }
    if (hasRightOverflowDot) {
      indicators[maximumNumberOfDots - 1] = 'small'
    }
    return indicators
  }

  return (
    <View style={styles.containerStyle}>
      {getIndicators().map((indicator, index) => {
        switch (indicator) {
          case 'small':
            return <View key={index} style={[styles.dot, styles.smallDot]} />
          case 'large':
            return <View key={index} style={styles.dot} />
          case 'current':
            return <View key={index} style={[styles.dot, styles.currentDot]} />
        }
      })}
    </View>
  )
}

export default PageIndicator

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    dot: {
      alignSelf: 'center',
      aspectRatio: 1,
      width: 8,
      margin: 4,
      ...rounded.normal,
      backgroundColor: theme.color.icon.system.subtle,
    },
    smallDot: {
      margin: 6,
      width: 4,
    },
    currentDot: {
      backgroundColor: theme.color.background.system.surfaceBase,
    },
  })
