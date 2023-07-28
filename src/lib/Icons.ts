import { Platform } from 'react-native'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faAlignJustify as faAlignJustifyLight } from '@fortawesome/pro-light-svg-icons/faAlignJustify'
import { faAnalytics as faAnalyticsLight } from '@fortawesome/pro-light-svg-icons/faAnalytics'
import { faAngleDown as faAngleDownLight } from '@fortawesome/pro-light-svg-icons/faAngleDown'
import { faAngleUp as faAngleUpLight } from '@fortawesome/pro-light-svg-icons/faAngleUp'
import { faArrowCircleRight as faArrowCircleRightLight } from '@fortawesome/pro-light-svg-icons/faArrowCircleRight'
import { faArrowsRotate as faArrowsRotateLight } from '@fortawesome/pro-light-svg-icons/faArrowsRotate'
import { faArrowUpFromBracket as faArrowUpFromBracketLight } from '@fortawesome/pro-light-svg-icons/faArrowUpFromBracket'
import { faArrowUpFromSquare as faArrowUpFromSquareLight } from '@fortawesome/pro-light-svg-icons/faArrowUpFromSquare'
import { faBadge as faBadgeLight } from '@fortawesome/pro-light-svg-icons/faBadge'
import { faBadgeCheck as faBadgeCheckLight } from '@fortawesome/pro-light-svg-icons/faBadgeCheck'
import { faCalendarDay as faCalendarDayLight } from '@fortawesome/pro-light-svg-icons/faCalendarDay'
import { faCalendarRange as faCalendarRangeLight } from '@fortawesome/pro-light-svg-icons/faCalendarRange'
import { faCamera as faCameraLight } from '@fortawesome/pro-light-svg-icons/faCamera'
import { faCertificate as faCertificateLight } from '@fortawesome/pro-light-svg-icons/faCertificate'
import { faChartColumn as faChartColumnLight } from '@fortawesome/pro-light-svg-icons/faChartColumn'
import { faCheck as faCheckLight } from '@fortawesome/pro-light-svg-icons/faCheck'
import { faCheckCircle as faCheckCircleLight } from '@fortawesome/pro-light-svg-icons/faCheckCircle'
import { faCheckSquare as faCheckSquareLight } from '@fortawesome/pro-light-svg-icons/faCheckSquare'
import { faChevronCircleLeft as faChevronCircleLeftLight } from '@fortawesome/pro-light-svg-icons/faChevronCircleLeft'
import { faChevronCircleRight as faChevronCircleRightLight } from '@fortawesome/pro-light-svg-icons/faChevronCircleRight'
import { faChevronLeft as faChevronLeftLight } from '@fortawesome/pro-light-svg-icons/faChevronLeft'
import { faChevronRight as faChevronRightLight } from '@fortawesome/pro-light-svg-icons/faChevronRight'
import { faCircle as faCircleLight } from '@fortawesome/pro-light-svg-icons/faCircle'
import { faCircleCheck as faCircleCheckLight } from '@fortawesome/pro-light-svg-icons/faCircleCheck'
import { faCircleUser as faCircleUserLight } from '@fortawesome/pro-light-svg-icons/faCircleUser'
import { faClone as faCloneLight } from '@fortawesome/pro-light-svg-icons/faClone'
import { faCog as faCogLight } from '@fortawesome/pro-light-svg-icons/faCog'
import { faCommentAltExclamation as faCommentAltExclamationLight } from '@fortawesome/pro-light-svg-icons/faCommentAltExclamation'
import { faCropAlt as faCropAltLight } from '@fortawesome/pro-light-svg-icons/faCropAlt'
import { faEnvelope as faEnvelopeLight } from '@fortawesome/pro-light-svg-icons/faEnvelope'
import { faExclamationTriangle as faExclamationTriangleLight } from '@fortawesome/pro-light-svg-icons/faExclamationTriangle'
import { faExternalLink as faExternalLinkLight } from '@fortawesome/pro-light-svg-icons/faExternalLink'
import { faEye as faEyeLight } from '@fortawesome/pro-light-svg-icons/faEye'
import { faEyeSlash as faEyeSlashLight } from '@fortawesome/pro-light-svg-icons/faEyeSlash'
import { faGlobeEurope as faGlobeEuropeLight } from '@fortawesome/pro-light-svg-icons/faGlobeEurope'
import { faHeart as faHeartLight } from '@fortawesome/pro-light-svg-icons/faHeart'
import { faHexagon as faHexagonLight } from '@fortawesome/pro-light-svg-icons/faHexagon'
import { faImages as faImagesLight } from '@fortawesome/pro-light-svg-icons/faImages'
import { faInfoCircle as faInfoCircleLight } from '@fortawesome/pro-light-svg-icons/faInfoCircle'
import { faLanguage as faLanguageLight } from '@fortawesome/pro-light-svg-icons/faLanguage'
import { faMapMarkerAlt as faMapMarkerAltLight } from '@fortawesome/pro-light-svg-icons/faMapMarkerAlt'
import { faPaperPlaneTop as faPaperPlaneToplight } from '@fortawesome/pro-light-svg-icons/faPaperPlaneTop'
import { faPlayCircle as faPlayCircleLight } from '@fortawesome/pro-light-svg-icons/faPlayCircle'
import { faPlus as faPlusLight } from '@fortawesome/pro-light-svg-icons/faPlus'
import { faQrcode as faQrcodeLight } from '@fortawesome/pro-light-svg-icons/faQrcode'
import { faQuestionSquare as faQuestionSquareLight } from '@fortawesome/pro-light-svg-icons/faQuestionSquare'
import { faRandom as faRandomLight } from '@fortawesome/pro-light-svg-icons/faRandom'
import { faRectangleHistory as faRectangleHistoryLight } from '@fortawesome/pro-light-svg-icons/faRectangleHistory'
import { faShareNodes as faShareNodesLight } from '@fortawesome/pro-light-svg-icons/faShareNodes'
import { faSlidersH as faSlidersHLight } from '@fortawesome/pro-light-svg-icons/faSlidersH'
import { faSquare as faSquareLight } from '@fortawesome/pro-light-svg-icons/faSquare'
import { faStars as faStarsLight } from '@fortawesome/pro-light-svg-icons/faStars'
import { faTally as faTallyLight } from '@fortawesome/pro-light-svg-icons/faTally'
import { faTimes as faTimesLight } from '@fortawesome/pro-light-svg-icons/faTimes'
import { faTrashAlt as faTrashAltLight } from '@fortawesome/pro-light-svg-icons/faTrashAlt'
import { faTriangle as faTriangleLight } from '@fortawesome/pro-light-svg-icons/faTriangle'
import { faUndo as faUndoLight } from '@fortawesome/pro-light-svg-icons/faUndo'
import { faUser as faUserLight } from '@fortawesome/pro-light-svg-icons/faUser'
import { faUserCheck as faUserCheckLight } from '@fortawesome/pro-light-svg-icons/faUserCheck'
import { faUserGroup as faUserGroupLight } from '@fortawesome/pro-light-svg-icons/faUserGroup'
import { faUserPlus as faUserPlusLight } from '@fortawesome/pro-light-svg-icons/faUserPlus'
import { faUserSlash as faUserSlashLight } from '@fortawesome/pro-light-svg-icons/faUserSlash'
import { faUsersSlash as faUsersSlashLight } from '@fortawesome/pro-light-svg-icons/faUsersSlash'
import { faAlignJustify as faAlignJustifySolid } from '@fortawesome/pro-solid-svg-icons/faAlignJustify'
import { faAnalytics as faAnalyticsSolid } from '@fortawesome/pro-solid-svg-icons/faAnalytics'
import { faAngleDown as faAngleDownSolid } from '@fortawesome/pro-solid-svg-icons/faAngleDown'
import { faAngleUp as faAngleUpSolid } from '@fortawesome/pro-solid-svg-icons/faAngleUp'
import { faArrowCircleRight as faArrowCircleRightSolid } from '@fortawesome/pro-solid-svg-icons/faArrowCircleRight'
import { faArrowsRotate as faArrowsRotateSolid } from '@fortawesome/pro-solid-svg-icons/faArrowsRotate'
import { faArrowUpFromBracket as faArrowUpFromBracketSolid } from '@fortawesome/pro-solid-svg-icons/faArrowUpFromBracket'
import { faArrowUpFromSquare as faArrowUpFromSquareSolid } from '@fortawesome/pro-solid-svg-icons/faArrowUpFromSquare'
import { faBadge as faBadgeSolid } from '@fortawesome/pro-solid-svg-icons/faBadge'
import { faBadgeCheck as faBadgeCheckSolid } from '@fortawesome/pro-solid-svg-icons/faBadgeCheck'
import { faCalendarDay as faCalendarDaySolid } from '@fortawesome/pro-solid-svg-icons/faCalendarDay'
import { faCalendarRange as faCalendarRangeSolid } from '@fortawesome/pro-solid-svg-icons/faCalendarRange'
import { faCamera as faCameraSolid } from '@fortawesome/pro-solid-svg-icons/faCamera'
import { faCertificate as faCertificateSolid } from '@fortawesome/pro-solid-svg-icons/faCertificate'
import { faChartColumn as faChartColumnSolid } from '@fortawesome/pro-solid-svg-icons/faChartColumn'
import { faCheck as faCheckSolid } from '@fortawesome/pro-solid-svg-icons/faCheck'
import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/pro-solid-svg-icons/faCheckCircle'
import { faCheckSquare as faCheckSquareSolid } from '@fortawesome/pro-solid-svg-icons/faCheckSquare'
import { faChevronCircleLeft as faChevronCircleLeftSolid } from '@fortawesome/pro-solid-svg-icons/faChevronCircleLeft'
import { faChevronCircleRight as faChevronCircleRightSolid } from '@fortawesome/pro-solid-svg-icons/faChevronCircleRight'
import { faChevronLeft as faChevronLeftSolid } from '@fortawesome/pro-solid-svg-icons/faChevronLeft'
import { faChevronRight as faChevronRightSolid } from '@fortawesome/pro-solid-svg-icons/faChevronRight'
import { faCircle as faCircleSolid } from '@fortawesome/pro-solid-svg-icons/faCircle'
import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/pro-solid-svg-icons/faCircleCheck'
import { faCircleUser as faCircleUserSolid } from '@fortawesome/pro-solid-svg-icons/faCircleUser'
import { faClone as faCloneSolid } from '@fortawesome/pro-solid-svg-icons/faClone'
import { faCog as faCogSolid } from '@fortawesome/pro-solid-svg-icons/faCog'
import { faCommentAltExclamation as faCommentAltExclamationSolid } from '@fortawesome/pro-solid-svg-icons/faCommentAltExclamation'
import { faCropAlt as faCropAltSolid } from '@fortawesome/pro-solid-svg-icons/faCropAlt'
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/pro-solid-svg-icons/faEnvelope'
import { faExclamationTriangle as faExclamationTriangleSolid } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle'
import { faExternalLink as faExternalLinkSolid } from '@fortawesome/pro-solid-svg-icons/faExternalLink'
import { faEye as faEyeSolid } from '@fortawesome/pro-solid-svg-icons/faEye'
import { faEyeSlash as faEyeSlashSolid } from '@fortawesome/pro-solid-svg-icons/faEyeSlash'
import { faGlobeEurope as faGlobeEuropeSolid } from '@fortawesome/pro-solid-svg-icons/faGlobeEurope'
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons/faHeart'
import { faHexagon as faHexagonSolid } from '@fortawesome/pro-solid-svg-icons/faHexagon'
import { faImages as faImagesSolid } from '@fortawesome/pro-solid-svg-icons/faImages'
import { faInfoCircle as faInfoCircleSolid } from '@fortawesome/pro-solid-svg-icons/faInfoCircle'
import { faLanguage as faLanguageSolid } from '@fortawesome/pro-solid-svg-icons/faLanguage'
import { faMapMarkerAlt as faMapMarkerAltSolid } from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt'
import { faPaperPlaneTop as faPaperPlaneTopSolid } from '@fortawesome/pro-solid-svg-icons/faPaperPlaneTop'
import { faPlayCircle as faPlayCircleSolid } from '@fortawesome/pro-solid-svg-icons/faPlayCircle'
import { faPlus as faPlusSolid } from '@fortawesome/pro-solid-svg-icons/faPlus'
import { faQrcode as faQrcodeSolid } from '@fortawesome/pro-solid-svg-icons/faQrcode'
import { faQuestionSquare as faQuestionSquareSolid } from '@fortawesome/pro-solid-svg-icons/faQuestionSquare'
import { faRandom as faRandomSolid } from '@fortawesome/pro-solid-svg-icons/faRandom'
import { faRectangleHistory as faRectangleHistorySolid } from '@fortawesome/pro-solid-svg-icons/faRectangleHistory'
import { faShareNodes as faShareNodesSolid } from '@fortawesome/pro-solid-svg-icons/faShareNodes'
import { faSlidersH as faSlidersHSolid } from '@fortawesome/pro-solid-svg-icons/faSlidersH'
import { faSquare as faSquareSolid } from '@fortawesome/pro-solid-svg-icons/faSquare'
import { faStars as faStarsSolid } from '@fortawesome/pro-solid-svg-icons/faStars'
import { faTally as faTallySolid } from '@fortawesome/pro-solid-svg-icons/faTally'
import { faTimes as faTimesSolid } from '@fortawesome/pro-solid-svg-icons/faTimes'
import { faTrashAlt as faTrashAltSolid } from '@fortawesome/pro-solid-svg-icons/faTrashAlt'
import { faTriangle as faTriangleSolid } from '@fortawesome/pro-solid-svg-icons/faTriangle'
import { faUndo as faUndoSolid } from '@fortawesome/pro-solid-svg-icons/faUndo'
import { faUser as faUserSolid } from '@fortawesome/pro-solid-svg-icons/faUser'
import { faUserCheck as faUserCheckSolid } from '@fortawesome/pro-solid-svg-icons/faUserCheck'
import { faUserGroup as faUserGroupSolid } from '@fortawesome/pro-solid-svg-icons/faUserGroup'
import { faUserPlus as faUserPlusSolid } from '@fortawesome/pro-solid-svg-icons/faUserPlus'
import { faUserSlash as faUserSlashSolid } from '@fortawesome/pro-solid-svg-icons/faUserSlash'
import { faUsersSlash as faUsersSlashSolid } from '@fortawesome/pro-solid-svg-icons/faUsersSlash'

type IconName =
  | 'achievement'
  | 'add'
  | 'add-user'
  | 'advance'
  | 'analytics'
  | 'back'
  | 'badge'
  | 'check'
  | 'close'
  | 'collapse'
  | 'completed'
  | 'configuration'
  | 'copy'
  | 'count'
  | 'crop'
  | 'date'
  | 'date-range'
  | 'delete'
  | 'disclose'
  | 'email'
  | 'enumeration'
  | 'error'
  | 'error-message'
  | 'europe'
  | 'exclusion'
  | 'expand'
  | 'external-link'
  | 'feed'
  | 'group'
  | 'hide'
  | 'image-gallery'
  | 'info'
  | 'language'
  | 'like'
  | 'list'
  | 'location'
  | 'new'
  | 'next'
  | 'photography'
  | 'playback'
  | 'previous'
  | 'qr-code'
  | 'random'
  | 'rarity-common'
  | 'rarity-rare'
  | 'rarity-relatively-common'
  | 'rarity-unknown'
  | 'rarity-very-rare'
  | 'refresh'
  | 'selection'
  | 'send'
  | 'settings'
  | 'share'
  | 'show'
  | 'statistics'
  | 'success'
  | 'undo'
  | 'upload'
  | 'user'
  | 'user-inactive'
  | 'user-profile'
  | 'user-verified'
  | 'validation-accepted-by-admin'
  | 'validation-accepted-with-evidence'
  | 'warning'

const icons: { [key in IconName]: { light: IconDefinition; solid: IconDefinition } } = {
  achievement: { light: faBadgeCheckLight, solid: faBadgeCheckSolid },
  add: { light: faPlusLight, solid: faPlusSolid },
  'add-user': { light: faUserPlusLight, solid: faUserPlusSolid },
  advance: { light: faArrowCircleRightLight, solid: faArrowCircleRightSolid },
  analytics: { light: faAnalyticsLight, solid: faAnalyticsSolid },
  back: { light: faChevronLeftLight, solid: faChevronLeftSolid },
  badge: { light: faBadgeLight, solid: faBadgeSolid },
  check: { light: faCheckLight, solid: faCheckSolid },
  close: { light: faTimesLight, solid: faTimesSolid },
  collapse: { light: faAngleUpLight, solid: faAngleUpSolid },
  completed: { light: faCheckSquareLight, solid: faCheckSquareSolid },
  configuration: { light: faSlidersHLight, solid: faSlidersHSolid },
  copy: { light: faCloneLight, solid: faCloneSolid },
  count: { light: faTallyLight, solid: faTallySolid },
  crop: { light: faCropAltLight, solid: faCropAltSolid },
  date: { light: faCalendarDayLight, solid: faCalendarDaySolid },
  'date-range': { light: faCalendarRangeLight, solid: faCalendarRangeSolid },
  delete: { light: faTrashAltLight, solid: faTrashAltSolid },
  disclose: { light: faChevronRightLight, solid: faChevronRightSolid },
  email: { light: faEnvelopeLight, solid: faEnvelopeSolid },
  enumeration: { light: faCircleLight, solid: faCircleSolid },
  error: { light: faExclamationTriangleLight, solid: faExclamationTriangleSolid },
  'error-message': { light: faCommentAltExclamationLight, solid: faCommentAltExclamationSolid },
  europe: { light: faGlobeEuropeLight, solid: faGlobeEuropeSolid },
  exclusion: { light: faUsersSlashLight, solid: faUsersSlashSolid },
  expand: { light: faAngleDownLight, solid: faAngleDownSolid },
  'external-link': { light: faExternalLinkLight, solid: faExternalLinkSolid },
  feed: { light: faRectangleHistoryLight, solid: faRectangleHistorySolid },
  group: { light: faUserGroupLight, solid: faUserGroupSolid },
  hide: { light: faEyeSlashLight, solid: faEyeSlashSolid },
  'image-gallery': { light: faImagesLight, solid: faImagesSolid },
  info: { light: faInfoCircleLight, solid: faInfoCircleSolid },
  language: { light: faLanguageLight, solid: faLanguageSolid },
  like: { light: faHeartLight, solid: faHeartSolid },
  list: { light: faAlignJustifyLight, solid: faAlignJustifySolid },
  location: { light: faMapMarkerAltLight, solid: faMapMarkerAltSolid },
  new: { light: faStarsLight, solid: faStarsSolid },
  next: { light: faChevronCircleRightLight, solid: faChevronCircleRightSolid },
  photography: { light: faCameraLight, solid: faCameraSolid },
  playback: { light: faPlayCircleLight, solid: faPlayCircleSolid },
  previous: { light: faChevronCircleLeftLight, solid: faChevronCircleLeftSolid },
  'qr-code': { light: faQrcodeLight, solid: faQrcodeSolid },
  random: { light: faRandomLight, solid: faRandomSolid },
  'rarity-common': { light: faTriangleLight, solid: faTriangleSolid },
  'rarity-rare': { light: faHexagonLight, solid: faHexagonSolid },
  'rarity-relatively-common': { light: faSquareLight, solid: faSquareSolid },
  'rarity-unknown': { light: faQuestionSquareLight, solid: faQuestionSquareSolid },
  'rarity-very-rare': { light: faCertificateLight, solid: faCertificateSolid },
  refresh: { light: faArrowsRotateLight, solid: faArrowsRotateSolid },
  selection: { light: faSquareLight, solid: faSquareSolid },
  send: { light: faPaperPlaneToplight, solid: faPaperPlaneTopSolid },
  settings: { light: faCogLight, solid: faCogSolid },
  share:
    Platform.OS === 'ios'
      ? { light: faArrowUpFromSquareLight, solid: faArrowUpFromSquareSolid }
      : { light: faShareNodesLight, solid: faShareNodesSolid },
  show: { light: faEyeLight, solid: faEyeSolid },
  statistics: { light: faChartColumnLight, solid: faChartColumnSolid },
  success: { light: faCircleCheckLight, solid: faCircleCheckSolid },
  undo: { light: faUndoLight, solid: faUndoSolid },
  upload: { light: faArrowUpFromBracketLight, solid: faArrowUpFromBracketSolid },
  user: { light: faUserLight, solid: faUserSolid },
  'user-inactive': { light: faUserSlashLight, solid: faUserSlashSolid },
  'user-profile': { light: faCircleUserLight, solid: faCircleUserSolid },
  'user-verified': { light: faUserCheckLight, solid: faUserCheckSolid },
  'validation-accepted-by-admin': { light: faCheckCircleLight, solid: faCheckCircleSolid },
  'validation-accepted-with-evidence': { light: faCheckSquareLight, solid: faCheckSquareSolid },
  warning: { light: faExclamationTriangleLight, solid: faExclamationTriangleSolid },
}

export default icons

export type { IconName }
