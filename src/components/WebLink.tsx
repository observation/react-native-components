import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text: string
}

const WebLink = ({ onPress, containerStyle, text, textStyle }: Props) => {
  const theme = useTheme()
  return (
    <IconText
      icon={<Icon name="external-link" size={theme.icon.size.m} />}
      text={text}
      style={{
        containerStyle,
        textStyle: [theme.text.link, textStyle],
      }}
      onPress={onPress}
    />
  )
}

export default WebLink
