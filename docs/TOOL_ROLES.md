# Tool Roles (Fixed)

Goal:
Max velocity with minimal rework by assigning each tool a single responsibility.

## ChatGPT (Strategy + Reasoning)
Use ChatGPT for:
- architecture and system design
- tradeoff analysis
- debugging complex failures from logs
- CI/CD patterns and environment strategy
- writing complete modules when scoped tightly
- generating runbooks and operational docs
- creating minimal, scalable patterns to reuse

Do NOT use ChatGPT for:
- endless incremental edits in one thread
- memory of prior chats as the primary record
- repetitive code edits better done in the IDE

Inputs required for ChatGPT:
- docs/BOOT_PROMPT.md
- docs/PROJECT.md
- slice/task definition
- logs/errors when debugging

Output handling:
- implement in code
- commit immediately
- reset the chat

---

## GitHub Copilot (Execution Speed in IDE)
Use Copilot for:
- inline code completion
- small function implementations
- refactors and renames
- test scaffolding
- repetitive boilerplate
- quick iterations inside existing files

Do NOT use Copilot for:
- architecture decisions
- designing interfaces across modules
- security-sensitive decisions without review

---

## GitHub (Source of Truth)
GitHub is the system of record for:
- all code
- docs/ (PROJECT, decisions, runbooks)
- workflows (.github/workflows)
- version history (commits and tags)
- issue tracking (optional, but preferred)

Hard rule:
If it is not in the repository, it does not exist.

---

## Standard Workflow
1) Use ChatGPT to design or solve
2) Use Copilot to implement efficiently
3) Commit to GitHub
4) Reset the chat
