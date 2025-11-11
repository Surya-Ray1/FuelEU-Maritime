# Reflection on AI-Agent Usage

This short reflection summarizes what I learned while using AI agents to build parts of the Fuel EU Maritime compliance module.

What I learned

- AI agents accelerate scaffold and documentation tasks: generating READMEs, initial route handlers, and test skeletons saved time on repetitive work.
- Agents are strongest when given constrained, precise prompts (inputs, outputs, and constraints). Vague prompts produce overly generic or occasionally incorrect code.

Efficiency gains vs manual coding

- Time saved: ~30–50% on boilerplate and documentation drafting, which allowed focusing on domain logic (CB calculations, pooling rules).
- The agent-produced pseudocode reduced iteration time for algorithm design; however, converting to strict TypeScript and writing tests remained essential and time-consuming.

Improvements for next time

- Provide unit tests as part of the initial prompt so the agent produces code that is already testable.
- Use a more structured prompt template (inputs, outputs, edge cases, example values) to reduce hallucinations.
- Keep a small set of curated snippets or helpers (utility functions) to ensure consistency across agent completions.

Closing

AI agents are effective copilots for engineering tasks when treated as high-quality scaffolding that must be reviewed and validated. For regulatory-domain logic like FuelEU CB calculations, human oversight and tests are non-negotiable.
# Reflection on Using AI Agents

This exercise highlighted practical ways AI agents speed up full‑stack delivery:

- Boilerplate acceleration: scaffolding TypeScript configs, ports/adapters, and HTTP wiring.
- Consistency: generated code follows naming and structure decisions uniformly.
- Iterative fixes: quick patch cycles to resolve integration details (e.g., CSS imports, proxy, env).

What I learned
- Keep domain/use‑cases pure and small; it makes agent‑generated code easy to validate and test.
- Provide precise prompts for cross‑cutting changes (e.g., Tailwind + proxy + endpoints) to reduce rework.

Efficiency vs manual coding
- Agent cut setup time drastically; I focused on domain math and constraints.
- Still required careful review for small mismatches and runtime assumptions (e.g., mapping routeId to shipId).

Improvements next time
- Add a dedicated Ship entity and proper adjusted‑CB calculation including banking deltas.
- Expand tests (integration with Supertest and edge cases) and CI.
- Add charts library for richer Compare visuals.

