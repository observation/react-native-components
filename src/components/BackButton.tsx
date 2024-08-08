import React from 'react'

import { NavigationProp, ParamListBase } from '@react-navigation/native'

import IconButton from '../components/IconButton'
import theme from '../styles/theme'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const BackButton = ({ navigation }: Props) => (
  <IconButton
    containerStyle={{ padding: theme.margin.common }}
    onPress={() => navigation.goBack()}
    icon={{ name: 'chevron-left', size: theme.icon.size.extraExtraLarge, color: theme.color.primary }}
  />
)

export default BackButton
