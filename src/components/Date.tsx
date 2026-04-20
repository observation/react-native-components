import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  date: string
  containerStyle?: StyleProp<ViewStyle>
}

const Date = ({ date, containerStyle }: Props) => {
  const theme = useTheme()
  return (
    <IconText
      icon={
        <Icon name="calendar-day" style={'solid'} color={theme.color.icon.system.disabled} size={theme.icon.size.m} />
      }
      text={date}
      style={{
        containerStyle,
        textStyle: theme.text.light,
      }}
      singleLineText
    />
  )
}

export default Date
