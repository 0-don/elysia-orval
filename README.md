## Setup

Install dependencies:
```bash
cd elysia && bun install
cd orval && bun install
```

## Testing

1. Start the server:
```bash
cd elysia
bun run dev
```

2. Generate client types:
```bash
cd orval
bun run openapi
```

3. Test the client:
```bash
cd orval
bun run dev
```

## Endpoints

- GET `/?name=test` - Returns hello message
- POST `/hello` with `{"id": 123}` - Returns "OpenAPI"
- OpenAPI docs at `http://localhost:3000/swagger`

## Manual Testing
```bash
# Test GET endpoint
curl "http://localhost:3000/?name=test"

# Test POST endpoint  
curl -X POST "http://localhost:3000/hello" \
  -H "Content-Type: application/json" \
  -d '{"id": 123}'
```

The TypeScript client in `orval/src/index.ts` shows type-safe usage of the generated API client.