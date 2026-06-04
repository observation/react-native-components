import React from 'react'
import { Text, TextProps } from 'react-native'

import { capitalize } from '../lib/Utils'

/**
 * Renders the children, capitalizing the first child when this is a string
 */
const CapitalizeText = ({ children, ...props }: TextProps) => (
  <Text {...props}>
    {React.Children.map(children, (child, index) =>
      index === 0 && typeof child === 'string' ? capitalize(child) : child,
    )}
  </Text>
)

export default CapitalizeText
