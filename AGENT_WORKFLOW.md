# AI Agent Workflow Log

## Agents Used

- GitHub Copilot (inline completions) — used for quick boilerplate and small helper functions.
- ChatGPT (GPT-4-style prompts) — used interactively to draft documentation, refine prompts, and produce algorithmic pseudocode for banking/pooling.
- Local editor automation (apply_patch / git) — used to apply edits programmatically and record changes.

## Prompts & Outputs

- Example 1 — README generation

  Prompt:

  "Create a project README for a Fuel EU Maritime compliance module (frontend: React+TS+Tailwind, backend: Node+TS+Postgres). Include architecture notes, setup steps, tests, and example API requests. Keep it concise but actionable."

  Generated snippet (excerpt):

  > This repository contains a minimal, well-structured implementation of a Fuel EU Maritime compliance module used for a take-home full-stack assignment.

  The generated output was used as the base for `README.md`, then trimmed and adjusted to match the repository layout.

- Example 2 — Pooling algorithm sketch

  Prompt:

  "Provide a short TypeScript function (pseudocode) that takes an array of members with `cb_before` and greedily transfers surplus to deficits while enforcing that no surplus ship ends with negative CB and no deficit ship ends worse than before. Return `cb_after` per member." 

  Generated snippet (excerpt):

  > Sort members by cb_before descending; iterate and move surplus to the largest deficits; track cb_after per member. Validate final sum >= 0.

  This pseudocode was reviewed and converted into a strict TypeScript implementation within the core use-case tests.

## Validation / Corrections

- Manual review: every agent-generated snippet was inspected and edited for accuracy, types, and repository conventions.
- Sanity checks: formulas (Target − Actual) × Energy were cross-checked against the assignment constants (target = 89.3368 gCO₂e/MJ; 41,000 MJ/t fuel).
- Corrections made: clarified API shapes, ensured `shipId` vs `routeId` mapping, and added defensive checks (e.g., prevent applying more banked amount than available).

## Observations

- Where agents saved time:
  - Rapid generation of README and documentation drafts.
  - Boilerplate for API route handlers and interfaces.
  - Quick algorithm sketches for pooling/banking that were easy to convert to typed code.

- Where agents needed supervision:
  - Hallucinated APIs or package usage occasionally (e.g., named a library function that doesn't exist in the project); required human correction.
  - Edge-condition logic (pooling constraints) needed explicit unit tests to be reliable.

## Best Practices Followed

- Start with precise prompts that include expected inputs/outputs and constraints.
- Use generated output as a scaffold, not final code — always review and adapt to project types and patterns.
- Add unit tests around agent-generated business logic (CB formula, bank/apply, pool allocation).
- Record prompts and key outputs in `AGENT_WORKFLOW.md` to show reproducibility and reviewability.

---

This document is a concise record of how AI agents were used as assistants during implementation. The agent outputs were always validated and adjusted to fit the hexagonal architecture and strict TypeScript types used across the project.
# AI Agent Workflow Log

## Agents Used
- OpenAI Codex CLI (primary agent for scaffolding and refactors)

## Prompts & Outputs
- Prompt: "Scaffold a hexagonal Node TS backend with Express + PostgreSQL for routes/compliance/banking/pooling; and a React+TS+Tailwind frontend with tabs."
  - Output: Generated backend ports, adapters, migrations, seeds, HTTP routers, and frontend pages with Tailwind-powered UI.
- Prompt refinement: "Add Vite proxy for API and Tailwind config; implement banking KPIs and greedy pooling."
  - Output: Vite proxy mapping, Tailwind config files, banking/pooling logic and UI.

## Validation / Corrections
- Ensured TypeScript strict options in backend tsconfig.
- Replaced default Vite CSS with Tailwind directives; corrected import location to avoid duplication.
- Added SQL migrations and seed scripts to align DB schema with domain.

## Observations
- Agent accelerated boilerplate generation (files, wiring, consistent naming).
- Needed manual decisions for ambiguous parts (e.g., mapping routeId to shipId for simplicity).
- Iterative patching surfaced small mismatches (CSS file contents) that were corrected.

## Best Practices Followed
- Hexagonal layering: core domain/use-cases/ports separate from adapters.
- Minimal dependencies; pure functions in use-cases for testability.
- Clear scripts for migrations, seeding, dev, build, and tests.

