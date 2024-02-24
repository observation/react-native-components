import React, { RefAttributes, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import font from '../styles/font'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  inputProps?: TextInputProps & RefAttributes<TextInput>
  inputStyle?: StyleProp<ViewStyle>
  label?: string
  rightIcon?: JSX.Element
  description?: string
  errorMessage?: string
}

const InputField = ({ containerStyle, inputProps, inputStyle, label, rightIcon, description, errorMessage }: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  // Set lineHeight to 0 to fix vertical alignment of the input text on iOS
  // Do this only for iOS, as setting it to 0 on Android results in input text being invisible
  const fixInputStyle = Platform.OS === 'ios' ? { lineHeight: 0 } : {}

  const hasErrors = !!errorMessage
  const borderColor = theme.getBorderColor({ isFocused, hasErrors })

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && (
        <View>
          <Text style={styles.labelStyle}>{label}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[{ borderColor }, styles.inputStyle, inputStyle, fixInputStyle]}
          {...inputProps}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.color.placeholder}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {errorMessage && (
        <IconText
          icon={<Icon name="exclamation-triangle" size={theme.icon.size.small} color={theme.color.error} />}
          text={errorMessage}
          style={{
            textStyle: styles.errorStyle,
            containerStyle: { marginTop: theme.margin.half },
          }}
        />
      )}
      {description && <Text style={{ marginTop: theme.margin.half, ...styles.descriptionStyle }}>{description}</Text>}
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
  },
  labelStyle: {
    ...textStyle.inputLabel,
    marginBottom: theme.margin.half,
  },
  inputStyle: {
    ...theme.input,
    ...textStyle.input,
  },
  rightIcon: {
    ...theme.absoluteRight,
    justifyContent: 'center',
  },
  errorStyle: {
    ...font.small,
    color: theme.color.error,
  },
  descriptionStyle: {
    ...font.small,
    color: theme.color.greyDark,
  },
})
