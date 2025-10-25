import { defineConfig } from "orval";

export default defineConfig({
  app: {
    input: {
      target: "http://localhost:3000/v3/api-docs",
      validation: false,
    },
    output: {
      target: "./openapi.ts",

    },
    hooks: { afterAllFilesWrite: "prettier --write" },
  },
});
