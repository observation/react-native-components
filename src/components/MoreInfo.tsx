import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { IconInfo } from './Icon'
import IconText from './IconText'
import textStyle from '../styles/text'
import theme from '../styles/theme'
import i18n from '../translations/i18n'

type Props = {
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  testID?: string
}

const MoreInfo = ({ onPress, containerStyle }: Props) => (
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
