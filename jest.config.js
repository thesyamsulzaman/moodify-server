/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/mock.ts'],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
}; 