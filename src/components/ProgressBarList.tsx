import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { IconSuccess } from './Icon'
import ProgressBar from '../data/ProgressBar'
import font from '../styles/font'
import theme from '../styles/theme'

type Props = {
  progressBars: ProgressBar[]
  separator: string
}

const ProgressBarList = ({ progressBars, separator }: Props) => {
  const getMarginBottom = (i: number) => (i === progressBars.length - 1 ? 0 : borderRadius)

  // With small percentages (<10%) the gray bar is visible because of the border radius:
  // the growing bar grows faster than the numbersContainer is shifted to the left
  // If the radius is set to 0 for the first X% (for example 50), this is resolved
  const getBorderRadiusForGrowingBar = (progressBar: ProgressBar) => (progressBar.percentage < 50 ? 0 : borderRadius)

  const allProgressbarTextsAreEmpty = progressBars.every((progressBar) => !progressBar.label)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.labelsContainer}>
        {progressBars.map((progressBar, i) => (
          <View
            key={i}
            style={{
              ...styles.labelContainer,

              marginBottom: getMarginBottom(i),
              backgroundColor: progressBar.backgroundColor,
            }}
          >
            <Text style={styles.label} ellipsizeMode="tail" numberOfLines={1}>
              {progressBar.label}
              <View
                // This view is placed here (instead of a rightPadding) to prevent a 1-pixel
                // white border on some android devices
                style={{
                  backgroundColor: progressBar.backgroundColor,
                  width: allProgressbarTextsAreEmpty ? 0 : 5,
                }}
              />
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.barsContainer}>
        {progressBars.map((progressBar: ProgressBar, i) => (
          <View
            key={i}
            style={{
              ...styles.greyBar,
              marginBottom: getMarginBottom(i),
            }}
          >
            <View
              testID="growing-bar"
              style={{
                borderTopRightRadius: getBorderRadiusForGrowingBar(progressBar),
                borderBottomRightRadius: getBorderRadiusForGrowingBar(progressBar),
                backgroundColor: progressBar.backgroundColor,
                width: `${progressBar.percentage}%`,
              }}
            />
            <View>
              <View
                style={{
                  ...styles.numbersContainer,
                  left: `-${progressBar.percentage}%`,
                  backgroundColor: progressBar.backgroundColor,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.numerator }}>{progressBar.currentAmount}</Text>
                  <Text style={{ ...styles.denominator }}>{` ${separator} ${progressBar.maximumAmount}`}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View>
        {progressBars.map((progressBar: ProgressBar, i) => (
          <View
            key={i}
            style={{
              ...styles.checkContainer,
              marginBottom: getMarginBottom(i),
            }}
          >
            {progressBar.isCompleted ? (
              <IconSuccess style="solid" color={progressBar.backgroundColor} size={theme.icon.size.small} />
            ) : (
              <IconSuccess color={theme.color.greySemi} size={theme.icon.size.small} />
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

const barHeight = 16
const borderRadius = barHeight / 2

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  labelsContainer: {
    maxWidth: '50%',
  },
  labelContainer: {
    justifyContent: 'center',
    height: barHeight,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    paddingLeft: borderRadius,
  },
  label: {
    ...font.small,
    color: theme.color.white70,
    justifyContent: 'center',
    lineHeight: barHeight,
  },
  barsContainer: {
    flex: 1,
  },
  greyBar: {
    flexDirection: 'row',
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    backgroundColor: theme.color.greySemi,
    width: '100%',
  },
  numbersContainer: {
    justifyContent: 'center',
    height: barHeight,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    paddingRight: borderRadius,
  },
  denominator: {
    ...font.small,
    color: theme.color.white70,
    lineHeight: barHeight,
  },
  numerator: {
    ...font.smallBold,
    color: theme.color.white,
    lineHeight: barHeight,
  },
  checkContainer: {
    justifyContent: 'center',
    marginLeft: borderRadius,
    height: barHeight,
  },
})

export default ProgressBarList
