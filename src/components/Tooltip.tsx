import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'

import { Icon, IconClose } from './Icon'
import LargeButton, { LargeButtonProps } from '../components/LargeButton'
import { IconName } from '../lib/Icons'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type TooltipProps = {
  title: string
  text: string
  iconName?: IconName
  closable?: boolean
  onClose?: () => void
  buttons?: LargeButtonProps[]
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  testID?: string
}

const Tooltip = ({
  iconName,
  title,
  text,
  closable = true,
  onClose,
  buttons = [],
  style,
  testID,
  children,
}: TooltipProps) => (
  <View style={[theme.shadow.ios, style]} testID={testID}>
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltip}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {iconName && (
            <View style={{ ...styles.iconContainer, marginRight: theme.margin.common }}>
              <Icon name={iconName} size={theme.icon.size.extraLarge} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={textStyle.lead}>{title}</Text>
          </View>
          {closable && (
            <View style={{ ...styles.iconContainer, marginLeft: theme.margin.common }}>
              <TouchableOpacity testID="close" onPress={onClose} activeOpacity={0.5} accessibilityLabel="close">
                <IconClose />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {children}
        <View style={{ marginTop: theme.margin.half }}>
          <Text style={textStyle.body}>{text}</Text>
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

export default Tooltip

export type { TooltipProps }

const styles = StyleSheet.create({
  tooltipContainer: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...theme.shadow.android,
  },
  tooltip: {
    flexDirection: 'column',
    margin: theme.margin.common,
  },
  iconContainer: {
    height: theme.font.lineHeight.medium,
    justifyContent: 'center',
  },
})
