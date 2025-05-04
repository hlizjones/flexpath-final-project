module.exports = {
  testEnvironment: 'jsdom',
  transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ["<rootDir>./setupTests.js"],
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",  
      "!src/**/*.test.{js,jsx,ts,tsx}", 
      "!src/setupTests.js"  
    ]
  };