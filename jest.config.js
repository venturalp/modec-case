module.exports = {
  globalSetup: '<rootDir>/src/globalSetup.js',
  moduleFileExtensions: ['ts', 'js'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  moduleNameMapper: {
    '^Assets(.*)$': '<rootDir>/src/Assets$1',
    '^Commons(.*)$': '<rootDir>/src/Commons$1',
    '^Config(.*)$': '<rootDir>/src/Config$1',
    '^Modules(.*)$': '<rootDir>/src/Modules$1',
  },
  transform: {
    '^.+\\.(svg|svg|ttf|png|jpg|jpeg|webp)$':
      '<rootDir>/src/Commons/tests/Tests.FileTransformer.js',
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/Config/**',
  ],
}
