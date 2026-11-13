import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Svg, { Circle } from 'react-native-svg'

import Log from '../lib/Log'
import { Theme, useStyles, useTheme } from '../theme'

type Props = {
  /** Percentage from 0 to 100 */
  percentage: number
  /** Color of the arc */
  color: string
  size?: number
  thickness?: number
  testID?: string
}

const PercentageCircle = ({ percentage, color, size = 48, thickness = 6, testID }: Props) => {
  Log.debug('PercentageCircle', percentage)

  const theme = useTheme()
  const styles = useStyles(createStyles)
  const center = size / 2
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(percentage, 0), 100) / 100

  return (
    <View testID={testID} style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={theme.color.icon.system.disabled}
          strokeWidth={thickness}
        />
        {progress > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference * (1 - progress)}
            transform={`rotate(-90 ${center} ${center})`}
          />
        )}
      </Svg>
      <View style={styles.textContainer}>
        <Text allowFontScaling={false} style={styles.percentageText}>
          {Math.round(percentage)}
          <Text style={styles.percentageSignText}>%</Text>
        </Text>
      </View>
    </View>
  )
}

export default PercentageCircle

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    textContainer: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentageText: {
      ...theme.font.smallBold,
      color: theme.color.text.system.strong,
    },
    percentageSignText: {
      ...theme.font.smallLight,
      color: theme.color.text.system.strong,
    },
  })
  return styles
}
