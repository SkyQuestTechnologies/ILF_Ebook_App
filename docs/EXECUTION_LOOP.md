# Execution Loop (Required Operating Cycle)

Objective:
Ship reliable increments with minimal context, minimal drift, and clean history.

Hard rule:
Never continue a chat after the commit. Always reset.

---

## The Loop

### 1) PLAN
Define the smallest shippable unit of work (slice).

A slice must:
- produce a user-visible capability OR a required system capability
- be implementable in one focused session
- avoid partial scaffolding without function

Document scope in your task tracker or commit message.

---

### 2) GENERATE
Open the correct chat type from docs/CHAT_MAP.md.

Paste:
1) docs/BOOT_PROMPT.md  
2) docs/PROJECT.md  
3) the slice definition  

Request complete, production-ready output.

Do not generate speculative code.

---

### 3) IMPLEMENT
Move the generated output into the repository.

Requirements:
- follow the defined folder structure
- resolve imports
- install dependencies
- ensure the project builds/runs locally (or in dev)

No placeholder logic remains unless explicitly accepted in PROJECT.md.

---

### 4) COMMIT
Create a clean commit immediately after the slice works.

Commit standard:

Type prefixes:
- feat:
- fix:
- refactor:
- chore:
- docs:
- ci:

Format:
<type>: <what was delivered>

Examples:
feat: add JWT auth middleware  
fix: resolve race condition in job runner  
ci: add build workflow  

If an architectural decision occurred:
- update docs/PROJECT.md
- create a file in docs/DECISIONS/

---

### 5) RESET
Close the chat used for the slice.

Do not append new work to the same thread.

Start the next slice in a new chat using:
- docs/BOOT_PROMPT.md
- docs/PROJECT.md

---

## Guardrails

Do not:
- batch multiple slices into one commit
- continue long chats
- implement without a plan
- generate code without the spec context

Always:
- ship small
- commit fast
- reset context
- keep docs aligned
