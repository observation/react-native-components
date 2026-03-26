import React, { RefAttributes, useRef, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

import { Icon } from './Icon'
import IconText from './IconText'
import { Theme } from '../@types/theme'
import { font, inputStyles, layout, rounded } from '../styles'
import textStyle from '../styles/text'
import { useStyles, useTheme } from '../theme/ThemeProvider'

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
  const borderColor = hasErrors ? theme.color.error500 : isFocused ? theme.color.primary300 : theme.color.grey300

  const inputContainerStyle = disabled ? { backgroundColor: theme.color.grey50 } : {}
  const placeholderTextColor = disabled ? theme.color.grey300 : theme.color.grey500

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
        <TextInput
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
          icon={<Icon name="exclamation-triangle" size={theme.icon.size.s} color={theme.color.error500} />}
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: 'column',
    },
    labelStyle: {
      ...textStyle.inputLabel,
      marginBottom: theme.margin.half,
    },
    inputStyle: {
      ...rounded.normal,
      ...inputStyles.input,
      ...textStyle.input,
    },
    rightIcon: {
      ...layout.absoluteRight,
      justifyContent: 'center',
    },
    errorStyle: {
      ...font.small,
      color: theme.color.error500,
    },
    descriptionStyle: {
      ...font.small,
      color: theme.color.grey800,
    },
  })
