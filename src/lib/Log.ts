import { logger, consoleTransport, configLoggerType } from 'react-native-logs'

const baseConfig = {
  transport: consoleTransport,
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

let loggerInstance = logger.createLogger(baseConfig)

const Log = {
  debug: (...args: unknown[]) => loggerInstance.debug(...args),
  trace: (...args: unknown[]) => loggerInstance.trace(...args),
  info: (...args: unknown[]) => loggerInstance.info(...args),
  warn: (...args: unknown[]) => loggerInstance.warn(...args),
  error: (...args: unknown[]) => loggerInstance.error(...args),
}

const setLogConfiguration = (config: Omit<configLoggerType, 'levels'>) => {
  Log.debug('Log:setLogConfiguration')

  const newConfig = {
    ...baseConfig,
    ...config,
  }
  loggerInstance = logger.createLogger(newConfig)
}

export default Log

export { setLogConfiguration }
