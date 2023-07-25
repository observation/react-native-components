import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { IconDate } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'

type Props = {
  date: string
  containerStyle?: StyleProp<ViewStyle>
}

const Date = ({ date, containerStyle }: Props) => (
  <IconText
    icon={<IconDate />}
    text={date}
    style={{
      containerStyle,
      textStyle: textStyle.light,
    }}
    singleLineText
  />
)

export default Date
