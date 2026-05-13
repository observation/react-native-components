import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import { useTheme } from '../theme/ThemeProvider'

type Props = {
  count: number
  style?: StyleProp<ViewStyle>
}

const Notification = ({ count, style }: Props) => {
  const theme = useTheme()
  return (
    <View
      style={[
        style,
        {
          backgroundColor: theme.color.background.system.error,
          borderRadius: 9,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Text
        allowFontScaling={false}
        style={{ ...theme.font.extraSmall, color: theme.color.text.system.staticWhite, textAlign: 'center' }}
      >
        {count}
      </Text>
    </View>
  )
}

export default Notification
