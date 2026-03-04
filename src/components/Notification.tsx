import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { font, theme } from '../styles'

type Props = {
  count: number
  style?: StyleProp<ViewStyle>
}

const Notification = ({ count, style }: Props) => (
  <View
    style={[
      style,
      {
        backgroundColor: theme.color.error500,
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
