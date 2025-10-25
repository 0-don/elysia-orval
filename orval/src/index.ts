import { getIndex } from "./openapi";

export function handleElysia<T extends { data: unknown; status: number }>(
  response: T
): T extends { status: 200 } ? T["data"] : never {
  if (response.status === 200) {
    return response.data as T extends { status: 200 } ? T["data"] : never;
  }
  throw response;
}

const result = handleElysia(await getIndex({ name: "asd" }));
console.log(result.hello);
