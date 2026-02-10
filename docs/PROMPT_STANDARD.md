# Prompt Requirements Standard (Required)

Objective:
Produce predictable, production-ready output with minimal back-and-forth.

Hard rule:
Never send an unstructured prompt.

Every request must follow the format below.

---

## The Standard Prompt Structure

Always provide these 5 blocks, in this order:

### 1) Context
State what the AI must consider.

Include:
- docs/PROJECT.md (pasted)
- relevant constraints
- target archetype if applicable

Example:
Context:
Using the attached PROJECT.md. This is an API service with minimal dependencies and security-first defaults.

---

### 2) Objective
Describe the single outcome required.

Rules:
- one objective only
- no bundled requests

Example:
Objective:
Generate a production-ready JWT authentication middleware.

---

### 3) Scope
Define exactly what is included and excluded.

Example:
Scope:
Include:
- middleware
- token validation
- error handling

Exclude:
- UI
- OAuth providers
- role management

---

### 4) Constraints
Force lean and scalable behavior.

Default constraints (reuse unless overridden):
- prefer boring, proven technology
- minimize services
- avoid overengineering
- production-ready only
- secure defaults
- observable errors

---

### 5) Output Requirements
Control the response format.

Example:
Output Requirements:
- ordered implementation steps
- complete code blocks
- file paths
- dependencies listed
- no pseudocode
- no placeholders

---

## Full Prompt Example

Context:
[paste PROJECT.md]

Objective:
Create a production-ready health check endpoint.

Scope:
Include basic dependency checks.
Exclude database failover logic.

Constraints:
Lean, minimal dependencies, production-ready.

Output Requirements:
Provide file paths, code, and setup steps.
No pseudocode.

---

## Guardrails

Do not:
- ask multi-part questions
- request architecture and implementation together
- send vague prompts ("build this", "help with that")
- rely on prior chat memory

Always:
- paste PROJECT.md
- constrain the problem
- request production-ready output
- keep prompts narrow

---

## Enforcement Rule

If a prompt does not follow this structure:

Stop. Rewrite it before sending.
