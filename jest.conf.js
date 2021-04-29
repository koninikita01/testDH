module.exports = {
    roots: ["<rootDir>"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/(TC|e2e)/.*|(\\.|/))\\.test\\.js?$",
    coveragePathIgnorePatterns: ["dist", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };