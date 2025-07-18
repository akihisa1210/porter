import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html", "lcov"],
    },
  },
  esbuild: {
    target: "node22"
  }
});
