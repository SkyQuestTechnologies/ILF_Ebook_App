# Hard Rules (Non-Negotiable)

Objective:
Protect build velocity, prevent architectural drift, and ensure the system scales across hundreds of projects.

These rules are mandatory.

---

## Context Control

✅ Always paste docs/BOOT_PROMPT.md and docs/PROJECT.md at the start of a new chat.

❌ Never rely on AI memory.
❌ Never continue long threads.

Hard limit:
- Reset chats frequently.
- Do not allow chats to grow large.

AI is compute — not storage.

---

## Documentation Discipline

✅ docs/PROJECT.md is the architectural contract.
✅ docs/DECISIONS/ records irreversible choices.
✅ docs/RUNBOOK.md documents operations.

Rule:
If a decision is made and not documented, it is considered undone.

---

## Slice-Based Delivery

✅ Ship in small vertical slices.
✅ Each slice must result in working capability.

❌ No large batch builds.
❌ No speculative infrastructure.
❌ No partial frameworks without function.

Working software > theoretical completeness.

---

## Commit Discipline

Commit immediately after a slice is functional.

Commit format:

feat: user authentication endpoint  
fix: resolve token parsing bug  
ci: add deployment workflow  

Rules:
❌ No large, mixed commits  
❌ No “final cleanup” commits  
❌ No untracked local changes  

If it works → commit.

---

## Architecture Protection

Prefer:

- proven technology  
- minimal services  
- low operational overhead  
- stateless patterns  
- secure defaults  

Avoid:

- trendy stacks without operational maturity  
- microservices before scale demands it  
- premature optimization  
- unnecessary abstraction  

Simple scales. Complexity collapses.

---

## Operational Safety

Every project must be:

- deployable  
- recoverable  
- observable  

Minimum standards:
- structured logging
- environment isolation
- secrets not stored in code
- reproducible builds

If it cannot be deployed reliably, it is not complete.

---

## Tool Discipline

ChatGPT → reasoning  
Copilot → execution  
GitHub → source of truth  

Do not blur roles.

Velocity comes from clarity.

---

## Scope Enforcement

Protect the MVP.

When new ideas appear:

Do NOT inject them into the current build.

Instead:
Record them and continue shipping.

Expansion follows stability.

---

## Scaling Rule

Build every project as if you will manage 100+.

This means:

- standardized docs
- repeatable structure
- predictable deployment
- minimal cognitive load

You are building a factory — not a one-off product.

---

## Final Operating Principle

Speed is not rushing.

Speed is the result of:

clear constraints  
small slices  
clean commits  
stateless AI usage  
documented decisions  

Follow the system.
Do not improvise.
