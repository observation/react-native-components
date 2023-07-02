import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { IconInfo } from './Icon'
import IconText from './IconText'
import I18n from '../lib/I18n'
import textStyle from '../styles/text'
import theme from '../styles/theme'

type Props = {
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  testID?: string
  i18n: I18n
}

const MoreInfo = ({ onPress, containerStyle, i18n }: Props) => (
  <IconText
    icon={<IconInfo size={theme.icon.size.medium} />}
    text={i18n.t('About the species')}
    style={{
      containerStyle,
      textStyle: textStyle.link,
    }}
    onPress={onPress}
  />
)

export default MoreInfo
