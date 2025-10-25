import { defineConfig } from "orval";

export default defineConfig({
  app: {
    input: {
      target: "http://localhost:3000/openapi/json",
      validation: false,
    },
    output: {
      target: './openapi.ts',
      client: 'fetch',
      prettier: true
    }
  },
});
