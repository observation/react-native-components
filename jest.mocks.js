import { Image } from 'react-native'

jest.mock('@react-native-firebase/crashlytics', () => {
    const crash = jest.fn()  
    const setUserId = jest.fn(() => Promise.resolve())
    return { 
      __esModule: true,
      default: () => ({
        crash,
        setUserId
      }),
     }
  })

// Mock font awesome
const Icon = 'Icon'
const getIconType = (prefix) => {
  switch (prefix) {
    case 'fas':
      return 'solid'
    case 'fal':
      return 'light'
    default:
      throw new Error()
  }
}
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: (faIcon) => (
    <Icon
      testID={faIcon.testID}
      color={faIcon.color}
      name={faIcon.icon.iconName}
      size={faIcon.size}
      style={faIcon.style}
      type={getIconType(faIcon.icon.prefix)}
    />
  ),
}))

Image.getSizeWithHeaders = jest.fn(() => Promise.resolve({ width: 0, height: 0 }))
