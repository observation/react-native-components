import React from 'react'
import { View, Text, ViewStyle, StyleProp } from 'react-native'

import font from '../styles/font'
import theme from '../styles/theme'

type Props = {
  count: number
  style?: StyleProp<ViewStyle>
}

const Notification = ({ count, style }: Props) => (
  <View
    style={[
      style,
      {
        backgroundColor: theme.color.error,
        borderRadius: 9,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <Text allowFontScaling={false} style={{ ...font.extraSmall, color: 'white', textAlign: 'center' }}>
      {count}
    </Text>
  </View>
)

export default Notification
