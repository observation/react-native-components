module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['lib'],
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}', '!**/__tests__/**'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}