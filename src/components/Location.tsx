import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
  location: string
  containerStyle?: StyleProp<ViewStyle>
}

const Location = ({ location, containerStyle }: Props) => {
  const theme = useTheme()
  return (
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
}

export default Location
