module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['lib'],
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}