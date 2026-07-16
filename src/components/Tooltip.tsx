import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { Icon, IconProps } from './Icon'
import LargeButton, { LargeButtonProps } from '../components/LargeButton'
import { shadow } from '../styles'
import { Theme, useStyles, useTheme } from '../theme'

type TooltipProps = {
  title: string
  text: string
  icon?: IconProps
  closable?: boolean
  onClose?: () => void
  buttons?: LargeButtonProps[]
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  testID?: string
}

const Tooltip = ({
  icon,
  title,
  text,
  closable = true,
  onClose,
  buttons = [],
  style,
  testID,
  children,
}: TooltipProps) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)

  return (
    <View style={[shadow.normal.ios, style]} testID={testID}>
      <View style={styles.tooltipContainer}>
        <View style={styles.tooltip}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {icon && (
              <View style={{ ...styles.iconContainer, marginRight: theme.margin.common }}>
                <Icon size={theme.icon.size.xl} {...icon} />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={theme.text.lead}>{title}</Text>
            </View>
            {closable && (
              <View style={{ ...styles.iconContainer, marginLeft: theme.margin.common }}>
                <TouchableOpacity testID="close" onPress={onClose} activeOpacity={0.5} accessibilityLabel="close">
                  <Icon name="times" color={theme.color.icon.system.subtler} size={theme.icon.size.xl} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {children}
          <View style={{ marginTop: theme.margin.half }}>
            <Text style={theme.text.body}>{text}</Text>
          </View>
          {buttons && buttons.length > 0 && (
            <View
              style={{
                marginTop: theme.margin.common,
                marginHorizontal: -theme.margin.half,
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              {buttons.map((button) => (
                <LargeButton
                  disabled={button.disabled}
                  secondary={button.secondary}
                  title={button.title}
                  key={button.title}
                  style={{ margin: 0, marginHorizontal: theme.margin.half }}
                  onPress={button.onPress}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Tooltip

export type { TooltipProps }

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    tooltipContainer: {
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      overflow: 'hidden',
      backgroundColor: theme.color.background.system.surfaceBase,
      ...shadow.normal.android,
    },
    tooltip: {
      flexDirection: 'column',
      margin: theme.margin.common,
    },
    iconContainer: {
      height: theme.lineHeight.medium,
      justifyContent: 'center',
    },
  })

  return styles
}
