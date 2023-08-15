import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Icons, { IconName } from '../lib/Icons'
import theme from '../styles/theme'

export type IconStyleProp = 'light' | 'solid'

type IconAppearanceProps = {
  style?: IconStyleProp
  color?: string
  size?: number
  testID?: string
}

type IconProps = IconAppearanceProps & {
  name: IconName
}

const { primary, success, warning, error, greySemi, greyBase, black, white, white80 } = theme.color
const { medium, large, extraLarge, extraExtraLarge } = theme.icon.size

const defaultProps: { [key in IconName]?: IconAppearanceProps } = {
  add: { size: extraLarge },
  advance: { style: 'solid' },
  check: { color: success },
  close: { color: greyBase, size: extraLarge },
  collapse: { size: extraExtraLarge },
  completed: { color: black },
  count: { color: white80 },
  date: { style: 'solid', color: greySemi, size: medium },
  disclose: { size: extraLarge },
  email: { style: 'solid' },
  enumeration: { style: 'solid' },
  error: { color: error },
  'error-message': { color: error },
  europe: { color: greySemi, style: 'solid' },
  exclusion: { color: error },
  expand: { size: extraExtraLarge },
  'external-link': { size: medium },
  hide: { style: 'solid' },
  language: { style: 'solid' },
  location: { style: 'solid', color: greySemi, size: medium },
  new: { color: success },
  next: { size: extraExtraLarge },
  playback: { color: white, style: 'solid', size: extraExtraLarge },
  previous: { size: extraExtraLarge },
  'rarity-common': { color: success, style: 'solid', size: medium },
  'rarity-rare': { color: warning, style: 'solid', size: medium },
  'rarity-relatively-common': { color: '#45D1D6', style: 'solid', size: medium },
  'rarity-unknown': { color: '#A6A6A4', style: 'solid', size: medium },
  'rarity-very-rare': { color: error, style: 'solid', size: medium },
  selection: { color: black },
  show: { style: 'solid' },
  success: { color: success },
  'tab-add': { size: extraExtraLarge },
  user: { color: greySemi },
  'validation-accepted-by-admin': { style: 'solid', size: theme.icon.size.medium },
  'validation-accepted-with-evidence': { color: success, style: 'solid', size: theme.icon.size.medium },
  warning: { color: warning },
}

export const IconAchievement = (props: IconAppearanceProps) => <Icon name="achievement" {...props} />
export const IconAdd = (props: IconAppearanceProps) => <Icon name="add" {...props} />
export const IconAddUser = (props: IconAppearanceProps) => <Icon name="add-user" {...props} />
export const IconAdvance = (props: IconAppearanceProps) => <Icon name="advance" {...props} />
export const IconAnalytics = (props: IconAppearanceProps) => <Icon name="analytics" {...props} />
export const IconBadge = (props: IconAppearanceProps) => <Icon name="badge" {...props} />
export const IconCheck = (props: IconAppearanceProps) => <Icon name="check" {...props} />
export const IconClose = (props: IconAppearanceProps) => <Icon name="close" {...props} />
export const IconCollapse = (props: IconAppearanceProps) => <Icon name="collapse" {...props} />
export const IconCompleted = (props: IconAppearanceProps) => <Icon name="completed" {...props} />
export const IconConfiguration = (props: IconAppearanceProps) => <Icon name="configuration" {...props} />
export const IconCopy = (props: IconAppearanceProps) => <Icon name="copy" {...props} />
export const IconCount = (props: IconAppearanceProps) => <Icon name="count" {...props} />
export const IconCrop = (props: IconAppearanceProps) => <Icon name="crop" {...props} />
export const IconDate = (props: IconAppearanceProps) => <Icon name="date" {...props} />
export const IconDateRange = (props: IconAppearanceProps) => <Icon name="date-range" {...props} />
export const IconDelete = (props: IconAppearanceProps) => <Icon name="delete" {...props} />
export const IconDisclose = (props: IconAppearanceProps) => <Icon name="disclose" {...props} />
export const IconDocument = (props: IconAppearanceProps) => <Icon name="document" {...props} />
export const IconEnumeration = (props: IconAppearanceProps) => <Icon name="enumeration" {...props} />
export const IconError = (props: IconAppearanceProps) => <Icon name="error" {...props} />
export const IconErrorMessage = (props: IconAppearanceProps) => <Icon name="error-message" {...props} />
export const IconExpand = (props: IconAppearanceProps) => <Icon name="expand" {...props} />
export const IconExternalLink = (props: IconAppearanceProps) => <Icon name="external-link" {...props} />
export const IconFeed = (props: IconAppearanceProps) => <Icon name="feed" {...props} />
export const IconGroup = (props: IconAppearanceProps) => <Icon name="group" {...props} />
export const IconImageGallery = (props: IconAppearanceProps) => <Icon name="image-gallery" {...props} />
export const IconInfo = (props: IconAppearanceProps) => <Icon name="info" {...props} />
export const IconList = (props: IconAppearanceProps) => <Icon name="list" {...props} />
export const IconLocation = (props: IconAppearanceProps) => <Icon name="location" {...props} />
export const IconLogin = (props: IconAppearanceProps) => <Icon name="login" {...props} />
export const IconNext = (props: IconAppearanceProps) => <Icon name="next" {...props} />
export const IconPhotography = (props: IconAppearanceProps) => <Icon name="photography" {...props} />
export const IconPlayback = (props: IconAppearanceProps) => <Icon name="playback" {...props} />
export const IconPrevious = (props: IconAppearanceProps) => <Icon name="previous" {...props} />
export const IconQrCode = (props: IconAppearanceProps) => <Icon name="qr-code" {...props} />
export const IconRarityCommon = (props: IconAppearanceProps) => <Icon name="rarity-common" {...props} />
export const IconRarityRare = (props: IconAppearanceProps) => <Icon name="rarity-rare" {...props} />
export const IconRarityUnknown = (props: IconAppearanceProps) => <Icon name="rarity-unknown" {...props} />
export const IconRarityVeryRare = (props: IconAppearanceProps) => <Icon name="rarity-very-rare" {...props} />
export const IconRarityRelativelyCommon = (props: IconAppearanceProps) => (
  <Icon name="rarity-relatively-common" {...props} />
)
export const IconSelection = (props: IconAppearanceProps) => <Icon name="selection" {...props} />
export const IconSettings = (props: IconAppearanceProps) => <Icon name="settings" {...props} />
export const IconStatistics = (props: IconAppearanceProps) => <Icon name="statistics" {...props} />
export const IconSuccess = (props: IconAppearanceProps) => <Icon name="success" {...props} />
export const IconTabAdd = (props: IconAppearanceProps) => <Icon name="tab-add" {...props} />
export const IconUpload = (props: IconAppearanceProps) => <Icon name="upload" {...props} />
export const IconUser = (props: IconAppearanceProps) => <Icon name="user" {...props} />
export const IconUserInactive = (props: IconAppearanceProps) => <Icon name="user-inactive" {...props} />
export const IconUserProfile = (props: IconAppearanceProps) => <Icon name="user-profile" {...props} />
export const IconUserVerified = (props: IconAppearanceProps) => <Icon name="user-verified" {...props} />
export const IconValidationAcceptedByAdmin = (props: IconAppearanceProps) => (
  <Icon name="validation-accepted-by-admin" {...props} />
)
export const IconValidationAcceptedWithEvidence = (props: IconAppearanceProps) => (
  <Icon name="validation-accepted-with-evidence" {...props} />
)

export const Icon = ({ name, color, size, testID, style }: IconProps): JSX.Element => {
  const props = defaultProps[name]
  const iconStyle = style ?? props?.style ?? 'light'
  const icon = iconStyle === 'light' ? Icons[name].light : Icons[name].solid
  const iconColor = color ?? props?.color ?? primary
  const iconSize = size ?? props?.size ?? large

  return <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} testID={testID} />
}
