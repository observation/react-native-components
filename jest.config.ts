import type { Config } from 'jest'

const config: Config = {
  preset: 'react-native',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}', '!**/__tests__/**'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}

export default config
