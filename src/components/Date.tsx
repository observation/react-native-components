import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  date: string
  containerStyle?: StyleProp<ViewStyle>
}

const Date = ({ date, containerStyle }: Props) => {
  const theme = useTheme()
  return (
    <IconText
      icon={<Icon name="calendar-day" style={'solid'} color={theme.color.grey300} size={theme.icon.size.m} />}
      text={date}
      style={{
        containerStyle,
        textStyle: textStyle.light,
      }}
      singleLineText
    />
  )
}

export default Date
