import React from 'react'
import { View, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'

import { IconCompleted, IconSelection } from './Icon'
import Log from '../lib/Log'
import theme from '../styles/theme'

type Props = {
  enabled: boolean
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  lineHeight?: number
  testID?: string
}

const Checkbox = ({
  enabled,
  onPress,
  containerStyle,
  iconContainerStyle,
  children,
  lineHeight = theme.margin.large,
  testID = 'pressable',
}: Props) => {
  Log.debug('Checkbox')

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.5}>
          <View style={[styles.iconInnerContainer, { width: lineHeight, height: lineHeight }]}>
            {enabled ? <IconCompleted /> : <IconSelection />}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexShrink: 1 }}>{children}</View>
    </View>
  )
}

export default Checkbox

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  iconInnerContainer: {
    justifyContent: 'center',
  },
})
