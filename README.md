# DocGen-UI

Vite + React console for [DocGen-API](https://github.com/DocGen-io/DocGen-API). Local UI for the M.Sc. thesis system — not a hosted product.

Site: [ali-hasan.me/projects/docgen](https://ali-hasan.me/projects/docgen)

## Stack

Vite, React 18, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Router. Tests: Vitest (`pnpm test`). Types: `pnpm typecheck`.

## Pages that exist

Login / register. Dashboard. Jobs + job details (live WebSocket logs). Endpoints + endpoint details (OpenAPI viewer). Revisions. Teams. Config. Prompts. Traces (Phoenix).

Roles come from the API: `ADMIN` / `MAINTAINER` / `EDITOR` / `VIEWER`.

## Run

```bash
pnpm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000/api/v1
pnpm dev               # http://localhost:5173
```

| Variable | Default |
|----------|---------|
| `VITE_API_URL` | `http://localhost:8000/api/v1` |
| `VITE_PHOENIX_HOST` | `http://localhost:6006` |

API + Celery worker: [DocGen-API](https://github.com/DocGen-io/DocGen-API). Pipelines: [DocGen-RAG](https://github.com/DocGen-io/DocGen-RAG).

Ali Saleem Hasan — [ali-hasan.me](https://ali-hasan.me)
