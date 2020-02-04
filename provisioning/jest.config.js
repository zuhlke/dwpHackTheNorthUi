module.exports = {
    "roots": [
      "<rootDir>/test"
    ],
    testMatch: [ '**/*.test.ts', '**/*.test.tsx'],
    "transform": {
      "^.+\\.ts$": "ts-jest", 
      "^.+\\.tsx$": "ts-jest"
    },
  };
