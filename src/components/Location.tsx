import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  location: string
  containerStyle?: StyleProp<ViewStyle>
}

const Location = ({ location, containerStyle }: Props) => (
  <IconText
    icon={<Icon name="map-marker-alt" style="solid" color={theme.color.greySemi} size={theme.icon.size.medium} />}
    text={location}
    style={{
      containerStyle,
      textStyle: textStyle.light,
    }}
    singleLineText
  />
)

export default Location
