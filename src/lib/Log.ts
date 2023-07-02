import crashlytics from '@react-native-firebase/crashlytics'
import { logger, consoleTransport } from 'react-native-logs'

const crashlyticsTransport = ({ msg }: { msg: string }) => crashlytics().log(msg)

const config = {
  transport: __DEV__ ? consoleTransport : crashlyticsTransport,
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  printLevel: false,
  printDate: true,
  severity: 'debug',
}

const Log = logger.createLogger(config)

export default Log
