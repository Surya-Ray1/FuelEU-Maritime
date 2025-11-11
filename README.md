# FuelEU Maritime — Full-Stack Assignment

# FuelEU Maritime — Compliance Module (Full-Stack)

This repository contains a minimal, well-structured implementation of a Fuel EU Maritime compliance module used for a take-home full-stack assignment.

Key ideas:
- Frontend: React + TypeScript + TailwindCSS (Vite)
- Backend: Node.js + TypeScript + PostgreSQL (Express + pg)
- Architecture: Hexagonal / Ports & Adapters (core logic separated from frameworks)

This README provides an overview, architecture notes, development setup, tests, and example API usage.

## Repository layout

- `frontend/` — React UI (tabs: Routes, Compare, Banking, Pooling)
- `backend/` — API server, domain logic, migrations and seeds
- `AGENT_WORKFLOW.md` — AI agent usage log (required by the assignment)
- `REFLECTION.md` — short reflection on AI agent use

## Architecture overview

The project follows a hexagonal (ports & adapters) pattern:

- Core (pure TypeScript) contains domain models and use-cases and has no framework or I/O dependencies.
- Inbound adapters implement HTTP handlers and connect to the core via ports.
- Outbound adapters provide database access (Postgres) and implement repository ports.

Backend structure (high level):

- `src/core/` — domain entities and application use-cases (ComputeCB, ComputeComparison, CreatePool, Banking)
- `src/ports/` — interface definitions used by core
- `src/adapters/inbound/http/` — Express routes and controllers
- `src/adapters/outbound/postgres/` — Postgres implementations for repositories
- `src/infrastructure/db/` — migrations and seeds

Frontend structure (high level):

- `src/core/` — domain DTOs and client-side ports
- `src/adapters/ui/` — React pages and components (Routes, Compare, Banking, Pooling)
- `src/adapters/infrastructure/` — API client implementing outbound ports

## Quick start (development)

Prerequisites:
- Node.js (16+ recommended)
- npm
- PostgreSQL (local or remote)

1) Configure backend environment

- Copy `backend/.env.example` -> `backend/.env` and set `POSTGRES_URL` (e.g. `postgres://user:pass@localhost:5432/fueleu`).

2) Install and prepare database & run server

```powershell
cd backend; npm install
# run migrations and seed the sample routes
npm run db:migrate; npm run db:seed
# start server (dev, with ts-node or nodemon)
npm run dev
```

3) Start frontend

```powershell
cd frontend; npm install; npm run dev
```

The frontend Vite server is configured to proxy API calls to the backend (defaults to http://localhost:5000).

## Tests

Backend unit tests cover core use-cases (ComputeCB, ComputeComparison, Banking, Pooling). To run them:

```powershell
cd backend; npm test
```

Integration tests exercise HTTP endpoints via supertest where available.

## Data model & constants

- Target intensity (2025): `89.3368 gCO₂e/MJ`
- Energy conversion: `1 t fuel ≈ 41,000 MJ`
- Compliance Balance (CB) for a route: `(Target - Actual) × Energy_in_scope`

Seeded routes (example dataset) include:

| routeId | vesselType | fuelType | year | ghgIntensity | fuelConsumption (t) |
|---|---:|---:|---:|---:|---:|
| R001 | Container | HFO | 2024 | 91.0 | 5000 |
| R002 | BulkCarrier | LNG | 2024 | 88.0 | 4800 |
| R003 | Tanker | MGO | 2024 | 93.5 | 5100 |
| R004 | RoRo | HFO | 2025 | 89.2 | 4900 |
| R005 | Container | LNG | 2025 | 90.5 | 4950 |

One route is seeded as baseline; the comparison endpoints use that baseline to compute percent diffs and compliance flags.

## API (examples)

All API calls assume backend at `http://localhost:5000`.

- List routes

```powershell
curl http://localhost:5000/routes
```

- Set baseline for a route

```powershell
curl -X POST http://localhost:5000/routes/R001/baseline
```

- Baseline vs comparison

```powershell
curl http://localhost:5000/routes/comparison
```

- Compute Compliance Balance (CB) snapshot (stores result)

```powershell
curl "http://localhost:5000/compliance/cb?shipId=R001&year=2024"
```

- Fetch adjusted CBs (used by Pooling UI)

```powershell
curl "http://localhost:5000/compliance/adjusted-cb?year=2024"
```

- Banking: bank surplus

```powershell
curl -X POST http://localhost:5000/banking/bank -H "Content-Type: application/json" -d '{"shipId":"R001","year":2024}'
```

- Banking: apply banked surplus

```powershell
curl -X POST http://localhost:5000/banking/apply -H "Content-Type: application/json" -d '{"shipId":"R003","year":2024,"amount":1000}'
```

- Pools: create a pool with greedy allocation

```powershell
curl -X POST http://localhost:5000/pools -H "Content-Type: application/json" -d '{"year":2024,"members":[{"shipId":"R002","cb_before":5000},{"shipId":"R003","cb_before":-4000}]}'
```

## Screenshots / UI

Start both servers and open the frontend Vite URL. The app exposes four tabs: Routes, Compare, Banking, Pooling. You can capture screenshots in your environment and add them to `frontend/public/` or this README.

## Notes about AI agent artifacts

- `AGENT_WORKFLOW.md` (included) documents how AI agents (Copilot, etc.) were used to accelerate scaffolding, refactors, and tests. It is a required deliverable for the assignment.
- `REFLECTION.md` contains a short one-page reflection about what was learned while using AI agents.

## Contributing / Commit & push to your GitHub

To commit this README locally and push to your GitHub repository (replace remote URL if required):

```powershell
git add README.md; git commit -m "chore: add project README"; git push
```

If you need to add the remote (first time):

```powershell
git remote add origin https://github.com/Surya-Ray1/FuelEU-Maritime.git
git push -u origin HEAD
```

## Final notes

This README is a starting point. The important deliverables required by the assignment are:

- Working frontend with the four tabs wired to the backend
- Backend APIs implementing routes, comparison, CB, banking, and pooling logic
- `AGENT_WORKFLOW.md` with prompts, outputs and validation steps
- Unit and integration tests covering core logic and endpoints

If you'd like, I can now commit this README and push it to the remote repository for you.
- See running app for the four tabs. You can capture screens after starting both servers.

