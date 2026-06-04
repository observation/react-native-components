import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

type Props = {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
}

const SingleLine = ({ children, style }: Props) => (
  <Text numberOfLines={1} ellipsizeMode="tail" style={style}>
    {children}
  </Text>
)

export default SingleLine
