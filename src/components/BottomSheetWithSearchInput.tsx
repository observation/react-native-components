import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetTextInput,
  TouchableOpacity,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet'
import { useTheme as useNavigationTheme } from '@react-navigation/native'
import { Easing } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import IconButton from './IconButton'
import ItemSeparator from './ItemSeparator'
import ListItem from './ListItem'
import useBottomSheetBackHandler from '../hooks/useBottomSheetBackHandler'
import Log from '../lib/Log'
import { createBottomSheetStyles } from '../styles/bottomSheet'
import { type Theme, createInputStyles, useStyles, useTheme } from '../theme'
import InputField from './InputField'
import SectionHeader from './SectionHeader'

type Props = {
  onClose: () => void
  onPress: (key: string) => void
  inputFieldPlaceholder: string
  data: DataItem[]
  selectedKey?: string
  sectionTitle: string
  children?: React.ReactNode
  listRef?: React.RefObject<BottomSheetFlatListMethods | null>
}

type DataItem = {
  key: string
  label: string
}

const Separator = () => <ItemSeparator />

const BottomSheetWithSearchInput = ({
  onClose,
  onPress,
  inputFieldPlaceholder,
  data,
  selectedKey,
  sectionTitle,
  children,
  listRef,
}: Props) => {
  const theme = useTheme()
  const inputStyles = createInputStyles(theme)
  const styles = useMemo(() => createStyles(theme, inputStyles), [theme, inputStyles])

  const [searchString, setSearchString] = useState('')
  const bottomSheetRef = useRef<BottomSheet>(null)
  const insets = useSafeAreaInsets()
  const { colors } = useNavigationTheme()
  const bottomSheetStyles = useStyles(createBottomSheetStyles)
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: theme.animation.duration.medium,
    easing: Easing.in(Easing.quad),
  })

  useBottomSheetBackHandler(bottomSheetRef)

  const onPressBackdrop = () => {
    Log.debug('BottomSheetWithSearchInput:onPressBackdrop')
    Keyboard.dismiss()
  }

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} onPress={onPressBackdrop} />
    ),
    [],
  )

  const onChange = useCallback((value: string) => {
    Log.debug('BottomSheetWithSearchInput:onChange', value)
    setSearchString(value)
  }, [])

  const onClear = useCallback(() => {
    Log.debug('BottomSheetWithSearchInput:onClear')
    setSearchString('')
  }, [])

  const handlePress = useCallback(
    (item: DataItem) => {
      Log.debug('BottomSheetWithSearchInput:handlePress', item)
      Keyboard.dismiss()
      onPress(item.key)
      bottomSheetRef.current?.close()
    },
    [onPress],
  )

  const filteredData = useMemo(
    () => data.filter((item) => item.label.toLowerCase().startsWith(searchString.toLowerCase())),
    [data, searchString],
  )

  const listHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        {children}
        <InputField
          textInputComponent={BottomSheetTextInput}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          inputProps={{
            testID: 'textInput',
            autoCorrect: false,
            placeholder: inputFieldPlaceholder,
            value: searchString,
            onChangeText: onChange,
          }}
          rightIcon={
            <IconButton
              Touchable={TouchableOpacity}
              containerStyle={styles.iconButtonContainer}
              onPress={onClear}
              testID="clearButton"
              icon={{
                name: 'circle-xmark',
                style: 'solid',
                color: theme.color.icon.system.subtler,
                size: theme.icon.size.s,
              }}
            />
          }
        />
        <SectionHeader title={sectionTitle} />
      </View>
    ),
    [children, inputFieldPlaceholder, sectionTitle, searchString, onChange, onClear, styles, theme],
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={backdropComponent}
      animationConfigs={animationConfigs}
      snapPoints={['80%']}
      enableDynamicSizing={false}
      handleIndicatorStyle={bottomSheetStyles.handleIndicator}
      handleStyle={[bottomSheetStyles.handle, { backgroundColor: colors.card }]}
      keyboardBehavior="extend"
    >
      <BottomSheetFlatList<DataItem>
        ref={listRef}
        data={filteredData}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={Separator}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom, backgroundColor: colors.card }}
        ListHeaderComponent={listHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <ListItem label={item.label} selected={item.key === selectedKey} onPress={() => handlePress(item)} />
        )}
      />
    </BottomSheet>
  )
}

export default BottomSheetWithSearchInput

const createStyles = (theme: Theme, inputStyles: ReturnType<typeof createInputStyles>) => {
  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: theme.color.background.system.surfaceRaised,
    },
    inputContainer: {
      marginHorizontal: theme.margin.half,
      marginTop: theme.margin.common,
      backgroundColor: theme.color.background.system.surfaceBase,
    },
    input: {
      ...theme.text.input,
      ...inputStyles.input,
    },
    iconButtonContainer: {
      paddingRight: theme.margin.common,
    },
  })
  return styles
}
