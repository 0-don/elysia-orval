import { fromTypes, openapi } from "@elysiajs/openapi";
import { log } from "console";
import { Elysia } from "elysia";

export const app = new Elysia()
  .use(
    openapi({
      references: fromTypes("src/index.ts"),
    })
  )
  .get("/", () => ({ hello: "hello" }))
  .post("/hello", () => "OpenAPI")
  .listen(3000);

log("Server running on http://localhost:3000");
