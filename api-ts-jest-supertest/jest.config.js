/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"], 
  verbose:true,
  forceExit:true,
  testTimeout:27000,
  clearMocks:true, // will clear all calls from the mocks in between test
  resetMocks:true, // will reset all mocks in between test
  restoreMocks:true // will restore all mocks in between test
};