import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Icons, { IconName } from '../lib/Icons'
import theme from '../styles/theme'

type IconAppearanceProps = {
  style?: 'light' | 'solid'
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
  user: { color: greySemi },
  'validation-accepted-by-admin': { style: 'solid', size: theme.icon.size.medium },
  'validation-accepted-with-evidence': { color: success, style: 'solid', size: theme.icon.size.medium },
  warning: { color: warning },
}

const Achievement = (props: IconAppearanceProps) => <Icon name="achievement" {...props} />
const Add = (props: IconAppearanceProps) => <Icon name="add" {...props} />
const AddUser = (props: IconAppearanceProps) => <Icon name="add-user" {...props} />
const Advance = (props: IconAppearanceProps) => <Icon name="advance" {...props} />
const Analytics = (props: IconAppearanceProps) => <Icon name="analytics" {...props} />
const Badge = (props: IconAppearanceProps) => <Icon name="badge" {...props} />
const Check = (props: IconAppearanceProps) => <Icon name="check" {...props} />
const Close = (props: IconAppearanceProps) => <Icon name="close" {...props} />
const Collapse = (props: IconAppearanceProps) => <Icon name="collapse" {...props} />
const Completed = (props: IconAppearanceProps) => <Icon name="completed" {...props} />
const Configuration = (props: IconAppearanceProps) => <Icon name="configuration" {...props} />
const Copy = (props: IconAppearanceProps) => <Icon name="copy" {...props} />
const Count = (props: IconAppearanceProps) => <Icon name="count" {...props} />
const Crop = (props: IconAppearanceProps) => <Icon name="crop" {...props} />
const Date = (props: IconAppearanceProps) => <Icon name="date" {...props} />
const DateRange = (props: IconAppearanceProps) => <Icon name="date-range" {...props} />
const Delete = (props: IconAppearanceProps) => <Icon name="delete" {...props} />
const Disclose = (props: IconAppearanceProps) => <Icon name="disclose" {...props} />
const Enumeration = (props: IconAppearanceProps) => <Icon name="enumeration" {...props} />
const Error = (props: IconAppearanceProps) => <Icon name="error" {...props} />
const ErrorMessage = (props: IconAppearanceProps) => <Icon name="error-message" {...props} />
const Expand = (props: IconAppearanceProps) => <Icon name="expand" {...props} />
const ExternalLink = (props: IconAppearanceProps) => <Icon name="external-link" {...props} />
const Group = (props: IconAppearanceProps) => <Icon name="group" {...props} />
const ImageGallery = (props: IconAppearanceProps) => <Icon name="image-gallery" {...props} />
const Info = (props: IconAppearanceProps) => <Icon name="info" {...props} />
const List = (props: IconAppearanceProps) => <Icon name="list" {...props} />
const Location = (props: IconAppearanceProps) => <Icon name="location" {...props} />
const Next = (props: IconAppearanceProps) => <Icon name="next" {...props} />
const Photography = (props: IconAppearanceProps) => <Icon name="photography" {...props} />
const Playback = (props: IconAppearanceProps) => <Icon name="playback" {...props} />
const Previous = (props: IconAppearanceProps) => <Icon name="previous" {...props} />
const QrCode = (props: IconAppearanceProps) => <Icon name="qr-code" {...props} />
const RarityCommon = (props: IconAppearanceProps) => <Icon name="rarity-common" {...props} />
const RarityRare = (props: IconAppearanceProps) => <Icon name="rarity-rare" {...props} />
const RarityUnknown = (props: IconAppearanceProps) => <Icon name="rarity-unknown" {...props} />
const RarityVeryRare = (props: IconAppearanceProps) => <Icon name="rarity-very-rare" {...props} />
const RarityRelativelyCommon = (props: IconAppearanceProps) => <Icon name="rarity-relatively-common" {...props} />
const Selection = (props: IconAppearanceProps) => <Icon name="selection" {...props} />
const Settings = (props: IconAppearanceProps) => <Icon name="settings" {...props} />
const Statistics = (props: IconAppearanceProps) => <Icon name="statistics" {...props} />
const Success = (props: IconAppearanceProps) => <Icon name="success" {...props} />
const Upload = (props: IconAppearanceProps) => <Icon name="upload" {...props} />
const User = (props: IconAppearanceProps) => <Icon name="user" {...props} />
const UserInactive = (props: IconAppearanceProps) => <Icon name="user-inactive" {...props} />
const UserProfile = (props: IconAppearanceProps) => <Icon name="user-profile" {...props} />
const UserVerified = (props: IconAppearanceProps) => <Icon name="user-verified" {...props} />
const ValidationAcceptedByAdmin = (props: IconAppearanceProps) => (
  <Icon name="validation-accepted-by-admin" {...props} />
)
const ValidationAcceptedWithEvidence = (props: IconAppearanceProps) => (
  <Icon name="validation-accepted-with-evidence" {...props} />
)

const Icon = ({ name, color, size, testID, style }: IconProps): JSX.Element => {
  const props = defaultProps[name]
  const iconStyle = style ?? props?.style ?? 'light'
  const icon = iconStyle === 'light' ? Icons[name].light : Icons[name].solid
  const iconColor = color ?? props?.color ?? primary
  const iconSize = size ?? props?.size ?? large

  return <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} testID={testID} />
}

export default Icon
export {
  Achievement,
  Add,
  AddUser,
  Advance,
  Analytics,
  Badge,
  Check,
  Close,
  Collapse,
  Completed,
  Configuration,
  Copy,
  Count,
  Crop,
  Date,
  DateRange,
  Delete,
  Disclose,
  Enumeration,
  Error,
  ErrorMessage,
  Expand,
  ExternalLink,
  Group,
  ImageGallery,
  Info,
  List,
  Location,
  Next,
  Photography,
  Playback,
  Previous,
  QrCode,
  RarityCommon,
  RarityRare,
  RarityUnknown,
  RarityVeryRare,
  RarityRelativelyCommon,
  Selection,
  Settings,
  Statistics,
  Success,
  Upload,
  User,
  UserInactive,
  UserProfile,
  UserVerified,
  ValidationAcceptedByAdmin,
  ValidationAcceptedWithEvidence,
}
