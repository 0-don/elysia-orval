import { node } from "@elysiajs/node";
import { fromTypes, openapi } from "@elysiajs/openapi";
import { log } from "console";
import { Elysia, t } from "elysia";

export const app = new Elysia({ adapter: node() })
  .use(
    openapi({
      references: fromTypes("src/index.ts"),
      documentation: { openapi: "3.1.0" }
    })
  )
  .onError((error) => {
    log("Error:", error);
    return { error: "An unexpected error occurred." };
  })
  .get("/", ({ query }) => ({ hello: "hello", query }), {
    query: t.Object({ name: t.String() })
  })
  .post("/hello", () => "OpenAPI", {
    body: t.Object({ id: t.Number() })
  })
  .listen(3000);

log("Server running on http://localhost:3000");
