module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-image-viewing|i18n-js)/)'],
  setupFiles: ['./jest.mocks.js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
