import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { preserveSymlinks: true },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "v8",
      ignoreEmptyLines: true,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    include: ["src/**/*.{js,jsx,ts,tsx}"],
    exclude: [
      "src/**/*.test.{js,jsx,ts,tsx}",
      "src/**/*.spec.{js,jsx,ts,tsx}",
      "src/index.{js,jsx,ts,tsx}",
      "src/setupTests.{js,ts}",
      "src/**/*.d.ts",
    ],
  },
});
