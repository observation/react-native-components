import React, { RefAttributes, useRef, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { font, layout, rounded } from '../styles'
import { Theme, createInputStyles, useStyles, useTheme } from '../theme'

type Props = {
  containerStyle?: StyleProp<ViewStyle>
  inputProps?: TextInputProps & RefAttributes<TextInput>
  inputStyle?: StyleProp<ViewStyle>
  errorStyle?: StyleProp<ViewStyle>
  descriptionStyle?: StyleProp<ViewStyle>
  label?: string
  rightIcon?: React.ReactElement
  description?: string
  errorMessage?: string
  disabled?: boolean
  textInputComponent?: React.ComponentType<any>
}

const InputField = ({
  containerStyle,
  inputProps,
  inputStyle,
  errorStyle,
  descriptionStyle,
  label,
  rightIcon,
  description,
  errorMessage,
  disabled = false,
  textInputComponent: TextInputComponent = TextInput,
}: Props) => {
  const theme = useTheme()
  const styles = useStyles(createStyles)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const didAutoFocus = useRef(false)

  // Set lineHeight to 0 to fix vertical alignment of the input text on iOS
  // Do this only for iOS, as setting it to 0 on Android results in input text being invisible
  const fixInputStyle = Platform.OS === 'ios' ? { lineHeight: 0 } : {}

  const hasErrors = !!errorMessage
  const borderColor = hasErrors
    ? theme.color.border.system.error
    : isFocused
      ? theme.color.border.system.focus
      : theme.color.border.system.default

  const inputContainerStyle = disabled ? { backgroundColor: theme.color.background.system.surfaceRaised } : {}
  const placeholderTextColor = disabled ? theme.color.text.system.disabled : theme.color.text.system.subtler

  const layoutHandler = inputProps?.autoFocus
    ? () => {
        if (didAutoFocus.current) {
          return
        }

        requestAnimationFrame(() => {
          inputRef.current?.focus()
          didAutoFocus.current = true
        })
      }
    : undefined

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && (
        <View>
          <Text style={styles.labelStyle}>{label}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', ...inputContainerStyle }}>
        <TextInputComponent
          ref={inputRef}
          style={[{ borderColor }, styles.inputStyle, inputStyle, fixInputStyle]}
          {...inputProps}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onLayout={layoutHandler}
          underlineColorAndroid="transparent"
          placeholderTextColor={placeholderTextColor}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {errorMessage && (
        <IconText
          icon={<Icon name="exclamation-triangle" size={theme.icon.size.s} color={theme.color.icon.system.error} />}
          text={errorMessage}
          style={{
            textStyle: [styles.errorStyle, errorStyle],
            containerStyle: { marginTop: theme.margin.half },
          }}
        />
      )}
      {description && (
        <Text style={[{ marginTop: theme.margin.half }, styles.descriptionStyle, descriptionStyle]}>{description}</Text>
      )}
    </View>
  )
}

export default InputField

// eslint-disable-next-line observation/no-function-without-logging
const createStyles = (theme: Theme) => {
  const inputStyles = createInputStyles(theme)

  return StyleSheet.create({
    containerStyle: {
      flexDirection: 'column',
    },
    labelStyle: {
      ...theme.text.inputLabel,
      marginBottom: theme.margin.half,
    },
    inputStyle: {
      ...rounded.normal,
      ...inputStyles.input,
      ...theme.text.input,
    },
    rightIcon: {
      ...layout.absoluteRight,
      justifyContent: 'center',
    },
    errorStyle: {
      ...font.small,
      color: theme.color.text.system.error,
    },
    descriptionStyle: {
      ...font.small,
      color: theme.color.text.system.subtle,
    },
  })
}
