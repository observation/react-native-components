import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { theme } from '../styles'
import textStyle from '../styles/text'

type Props = {
  date: string
  containerStyle?: StyleProp<ViewStyle>
}

const Date = ({ date, containerStyle }: Props) => (
  <IconText
    icon={<Icon name="calendar-day" style={'solid'} color={theme.color.greySemi} size={theme.icon.size.medium} />}
    text={date}
    style={{
      containerStyle,
      textStyle: textStyle.light,
    }}
    singleLineText
  />
)

export default Date
