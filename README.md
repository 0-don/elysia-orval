## Setup

Install dependencies:

```bash
cd elysia && npm install
cd orval && npm install
```

## Testing

1. Start the server:

```bash
cd elysia
npm run dev
```

2. Generate client types:

```bash
cd orval
npm run openapi
```

3. Test the client:

```bash
cd orval
npm run dev
```
