module.exports = {
    roots: ["<rootDir>"],
    reporters: [
      "default",
      [jest-html-reporters, {
        filename: "./TestReport.html",
       "expand": true,
        "openReport": true
      }]
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/(TC|e2e)/.*|(\\.|/))\\.test\\.js?$",
    coveragePathIgnorePatterns: ["dist", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    
  };