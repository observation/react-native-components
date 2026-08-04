module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@observation.org/react-native-image-viewing|i18n-js|react-native-scalable-image|color|@react-navigation))',
  ],
  setupFiles: ['./jest.mocks.js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}'],
  transform: {
    '\\.(jpg|jpeg|png|gif|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
        diagnostics: {
          exclude: ['**/node_modules/**'],
        },
      },
    ],
  },
}
