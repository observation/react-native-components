import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { IconLocation } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'

type Props = {
  location: string
  containerStyle?: StyleProp<ViewStyle>
}

const Location = ({ location, containerStyle }: Props) => (
  <IconText
    icon={<IconLocation />}
    text={location}
    style={{
      containerStyle,
      textStyle: textStyle.light,
    }}
    singleLineText
  />
)

export default Location
