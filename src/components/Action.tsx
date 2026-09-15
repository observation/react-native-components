import React from 'react'
import { StyleSheet } from 'react-native'

import { Icon, IconName, IconText } from '@observation.org/react-native-components'

import { Theme, useStyles, useTheme } from '../theme'

export type ActionType = 'neutral' | 'danger'

type Props = {
  iconName: IconName
  text: string
  onPress?: () => void
  type?: ActionType
}

const Action = ({ iconName, text, onPress, type = 'neutral' }: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  const iconColor = type === 'neutral' ? theme.color.icon.system.brand : theme.color.icon.system.error
  const textColor = type === 'neutral' ? theme.color.text.system.brand : theme.color.text.system.error
  const icon = <Icon name={iconName} color={iconColor} size={theme.icon.size.xl} />
  return (
    <IconText
      icon={icon}
      text={text}
      style={{
        containerStyle: styles.container,
        textStyle: [theme.text.body, { color: textColor }],
      }}
      onPress={onPress}
    />
  )
}

export default Action

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal: theme.margin.common,
    },
  })

  return styles
}
