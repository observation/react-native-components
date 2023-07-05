module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@observation.org/react-native-image-viewing|i18n-js|react-native-scalable-image)/)',
  ],
  setupFiles: ['./jest.mocks.js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
}
