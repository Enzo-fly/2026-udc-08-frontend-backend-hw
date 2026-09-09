# AGENTS.md

Baseline guidance for an Agentic IDE working in **this homework repo**.

> UDC Workshop 8 homework — one feature end to end: UI, API, database and
> authorization. Participants add "archive a note" across all four layers,
> audit the authorization of every endpoint, and record what the AI got
> wrong. See `docs/walkthrough.md`.

## Context

- `app/` is a small full-stack notes application, deliberately plain:
  **Express + SQLite (`better-sqlite3`) + vanilla HTML/JS, no build step and
  no frontend framework.** The workshop is about the seams between layers,
  not about a framework.
  - `app/src/db.js` — schema and seed data. Users **Оля (id 1)** and
    **Тарас (id 2)**; three notes.
  - `app/src/app.js` — the Express app and all routes.
  - `app/src/server.js` — starts it on port 3080 against a file database.
  - `app/public/` — the UI.
  - `app/test/api.test.js` — the seeded suite. `cd app && npm test` is green.
- **Authentication is deliberately simplified**: the caller identifies itself
  with an `x-user-id` header. Do not replace this with real sessions or JWT —
  it is out of scope on purpose. This homework is about what happens *after*
  you know who the caller is.

## Conventions

- Documentation language: Ukrainian or English (participant's choice).
- Deliverable paths so auto-review can find them:
  - the feature itself in `app/src/` and `app/public/`
  - new tests in `app/test/`
  - `docs/ai-mistakes.md` (Task D)
  - `docs/task-e-bonus.md` (Task E, bonus)
- **Do not add a bundler, a frontend framework, or a build step.** Plain
  ES modules in the browser and plain CommonJS-free ESM on the server.
- Money, dates and ids stay as they are; no new dependencies unless the task
  genuinely needs one — say why in the PR if you add one.

## Guardrails — read these before writing an endpoint

- **Every route that reads or changes a specific record must scope it to the
  caller, not just to the id.** The question the code has to answer is not
  "does this note exist" but "**may this user touch this note**". Assume this
  applies to routes that already exist as well as to the ones you add.
- **Validate on the server.** The UI is attacker-controlled; a rule enforced
  only in the browser is not enforced.
- **Do not widen the response.** Return what the caller needs, not the whole
  row "just in case".
- Schema changes must not destroy existing data, and the seeded users and
  tables must keep working — the tests depend on them.
- **NEVER** commit secrets, `.env`, or the generated `*.db` file.
- **Windows + Git Bash:** never use `2>nul` / `>nul` (creates a literal `nul`
  file). Use `2>/dev/null`.

## How to verify

Before opening a PR: `cd app && npm test` is green **including a test that
asks the authorization question** — one user attempting to reach another
user's note and being refused. A suite that only exercises the happy path
will stay green whether or not the authorization is correct, which is exactly
the trap this workshop is about.
