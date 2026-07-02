import React, { useState } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { Theme, useStyles, useTheme } from '../theme'

type Props = {
  text?: string
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  disabled?: boolean
}

const Chip = ({ text, textStyle, containerStyle, onPress, disabled }: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  const [borderRadius, setBorderRadius] = useState(theme.margin.common)
  return (
    <TouchableOpacity onPress={disabled ? undefined : onPress} activeOpacity={0.5} disabled={disabled}>
      <View
        onLayout={(event: LayoutChangeEvent) => setBorderRadius(event.nativeEvent.layout.height / 2)}
        style={[styles.chipContainer, { borderRadius }, containerStyle]}
      >
        <View style={styles.chipTextContainer}>
          <Text style={[styles.chipText, textStyle]}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Chip

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    chipTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    chipText: {
      ...theme.text.body,
      color: theme.color.text.system.staticWhite,
      lineHeight: theme.margin.common,
      fontSize: theme.fontSize.medium,
    },
    chipContainer: {
      backgroundColor: theme.color.background.system.observationStrong,
      paddingHorizontal: theme.margin.common,
      paddingVertical: theme.margin.half,
      borderRadius: theme.margin.common,
      minWidth: 44,
      justifyContent: 'center',
    },
  })

  return styles
}
