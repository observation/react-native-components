import React from 'react'

import { NavigationProp, ParamListBase } from '@react-navigation/native'

import IconButton from '../components/IconButton'
import { useTheme } from '../theme'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

const BackButton = ({ navigation }: Props) => {
  const theme = useTheme()

  return (
    <IconButton
      containerStyle={{ padding: theme.margin.common }}
      onPress={() => navigation.goBack()}
      icon={{ name: 'chevron-left', size: theme.icon.size.xxl, color: theme.color.icon.system.brand }}
    />
  )
}

export default BackButton
