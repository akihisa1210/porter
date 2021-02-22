module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: { resources: "usable" },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
};
