import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { theme } from '../styles'
import textStyle from '../styles/text'

type Props = {
  location: string
  containerStyle?: StyleProp<ViewStyle>
}

const Location = ({ location, containerStyle }: Props) => (
  <IconText
    icon={<Icon name="map-marker-alt" style="solid" color={theme.color.grey300} size={theme.icon.size.m} />}
    text={location}
    style={{
      containerStyle,
      textStyle: textStyle.light,
    }}
    singleLineText
  />
)

export default Location
