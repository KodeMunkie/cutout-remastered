/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  bail: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "./lib/",
    "./test"
  ],
  setupFilesAfterEnv: ["./test/test-config.ts"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  verbose: true
};