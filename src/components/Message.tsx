import React from 'react'
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native'

import LargeButton, { LargeButtonProps } from '../components/LargeButton'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  title?: string
  text: string
  buttons?: LargeButtonProps[]
  style?: StyleProp<ViewStyle>
}

const Message = ({ title, text, buttons, style }: Props) => (
  <View style={[styles.message, style]}>
    {title && (
      <View style={{ marginBottom: theme.margin.half }}>
        <Text style={textStyle.lead}>{title}</Text>
      </View>
    )}
    <View>
      <Text style={textStyle.body}>{text}</Text>
    </View>
    {buttons && buttons.length > 0 && (
      <View
        style={{
          marginTop: theme.margin.common,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {buttons.map((button, i) => (
          <LargeButton
            disabled={button!.disabled || false}
            secondary={button!.secondary || false}
            title={button!.title}
            key={i}
            style={{ margin: 0, marginRight: theme.margin.half }}
            onPress={button!.onPress!}
          />
        ))}
      </View>
    )}
  </View>
)

export default Message

const styles = StyleSheet.create({
  message: {
    flexDirection: 'column',
    marginBottom: 0,
  },
})
