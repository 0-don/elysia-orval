import { defineConfig } from "orval";

export default defineConfig({
  app: {
    input: {
      target: "http://localhost:3000/openapi/json",
    },
    output: {
      target: "./src/openapi.ts",
      client: "fetch",
      override: {
        mutator: {
          path: "./src/custom-fetch.ts",
          name: "customFetch",
        },
      },
    },
    hooks: { afterAllFilesWrite: "prettier --write" },
  },
});
