import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Log from '../lib/Log'
import { Theme, useStyles, useTheme } from '../theme'
import { Icon } from './Icon'
import InputPanel from './InputPanel'
import { rounded } from '../styles'

const height = 48

type Props = {
  testID: string
  isActive: boolean
  value?: string
  placeholder: string
  onPress: () => void
  onClear: () => void
}

const FilterSelectField = ({ testID, isActive, value, placeholder, onPress, onClear }: Props) => {
  Log.debug('FilterSelectField:render')

  const theme = useTheme()
  const styles = useStyles(createStyles)

  return (
    <View>
      <InputPanel
        value={value ?? placeholder}
        containerStyle={styles.inputPanelContainer}
        valueStyle={styles.inputPanelValue}
        capitalize
        onPress={onPress}
        showChevron={!isActive}
      />
      {isActive && (
        <TouchableOpacity style={styles.clear} onPress={onClear} testID={testID + '-clear'}>
          <Icon name="circle-xmark" style="solid" color={theme.color.icon.system.subtler} size={theme.icon.size.l} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default FilterSelectField

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    inputPanelContainer: {
      height: height,
      backgroundColor: theme.color.background.system.surfaceRaised,
      ...rounded.large,
    },
    inputPanelValue: {
      color: theme.color.text.system.brand,
    },
    clear: {
      position: 'absolute',
      right: theme.margin.common - (height - theme.icon.size.m) / 2,
      top: 0,
      padding: (height - theme.icon.size.m) / 2,
    },
  })
  return styles
}
