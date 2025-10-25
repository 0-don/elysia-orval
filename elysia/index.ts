import { node } from "@elysiajs/node";
import { openapi } from "@elysiajs/openapi";
import { log } from "console";
import { Elysia } from "elysia";

new Elysia({ adapter: node() })
  .use(openapi())
  .get("/", () => "hello")
  .post("/hello", () => "OpenAPI")
  .listen(3000);

log("Server running on http://localhost:3000");
