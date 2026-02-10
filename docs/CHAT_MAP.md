# Chat Map (Required)

Rule: One chat = one job. Do not mix jobs.

## 1) Architecture Chat
Use for:
- system design
- tech stack decisions
- data model
- API contracts
- diagrams and tradeoffs

Start the chat by pasting:
1) docs/BOOT_PROMPT.md
2) docs/PROJECT.md

Output is captured into:
- docs/PROJECT.md (updates)
- docs/DECISIONS/ (if a decision is made)

## 2) Build Chat
Use for:
- generating modules
- implementing features
- writing tests
- refactoring code

Start the chat by pasting:
1) docs/BOOT_PROMPT.md
2) docs/PROJECT.md
3) the specific file tree or target files for the task

Output is committed to code and documented in:
- docs/RUNBOOK.md (if operational)
- docs/PROJECT.md (if scope/contract changes)

## 3) Debug Chat
Use for:
- build failures
- runtime errors
- performance issues
- CI/CD issues

Start the chat by pasting:
1) docs/BOOT_PROMPT.md
2) docs/PROJECT.md
3) the exact error/logs and reproduction steps

Output must include:
- root cause
- minimal fix
- prevention (tests/guardrails) if applicable

## 4) Product Chat
Use for:
- MVP definition
- pricing/packaging
- UX copy and flows
- launch checklist items (product side)

Start the chat by pasting:
1) docs/BOOT_PROMPT.md
2) docs/PROJECT.md

Output is captured into:
- docs/PROJECT.md (MVP + success criteria)
- docs/LAUNCH.md (if created later)

## 5) DevOps Chat
Use for:
- CI/CD pipelines
- hosting/deploy strategy
- secrets management
- environment strategy

Start the chat by pasting:
1) docs/BOOT_PROMPT.md
2) docs/PROJECT.md

Output is captured into:
- docs/RUNBOOK.md
- .github/workflows/

