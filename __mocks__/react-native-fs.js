export default {
  moveFile: jest.fn(() => Promise.resolve()),
  copyFile: jest.fn(() => Promise.resolve()),
  unlink: jest.fn(() => Promise.resolve()),
  mkdir: jest.fn(() => Promise.resolve()),
  readDir: jest.fn(() => Promise.resolve()),
  DocumentDirectoryPath: '/documentDirectory',
  TemporaryDirectoryPath: '/tmp',
}
